import * as vscode from 'vscode';

export class GifViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'shikanokoNokonokoView';

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlContent(webviewView.webview);
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const gifPath = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'assets', 'shikanoko.gif')
    );

    const musicPath = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'assets', 'SHIKANOKO_NOKONOKO_KOSHITANTAN.mp3')
    );

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shikanoko nokonoko koshitantan</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          img {
            max-width: 100%;
            max-height: 100%;
          }

          audio {
            margin-top: 20px;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <img src="${gifPath}" />
        <audio controls autoplay loop>
          <source src="${musicPath}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </body>
      </html>`;
  }
}
