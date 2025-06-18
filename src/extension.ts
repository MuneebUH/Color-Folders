import * as vscode from 'vscode';
import * as path from 'path';

const folderColors = [
  { path: 'src', color: 'folderColor.color1' },
  { path: 'test', color: 'folderColor.color2' },
  { path: 'public', color: 'folderColor.color3' },
  { path: 'assets', color: 'folderColor.color4' },
  { path: 'components', color: 'folderColor.color5' },
  { path: 'utils', color: 'folderColor.color6' },
  { path: 'config', color: 'folderColor.color7' },
  { path: 'scripts', color: 'folderColor.color8' },
  { path: 'build', color: 'folderColor.color9' },
  { path: 'dist', color: 'folderColor.color10' },
  { path: 'notebooks', color: 'folderColor.color11' },
  { path: 'data', color: 'folderColor.color12' },
  { path: 'models', color: 'folderColor.color13' },
  { path: 'logs', color: 'folderColor.color14' },
  { path: 'venv', color: 'folderColor.color15' },
  { path: 'routes', color: 'folderColor.color16' },
  { path: 'lib', color: 'folderColor.color17' },
  { path: 'services', color: 'folderColor.color18' },
  { path: 'middleware', color: 'folderColor.color19' },
  { path: 'api', color: 'folderColor.color20' },
  { path: '.github', color: 'folderColor.color21' },
  { path: '.vscode', color: 'folderColor.color22' },
  { path: '.devcontainer', color: 'folderColor.color23' },
  { path: 'chroma_db', color: 'folderColor.color24' },
  { path: 'frontend', color: 'folderColor.color25' },
  { path: 'design', color: 'folderColor.color26' },
  { path: 'docs', color: 'folderColor.color27' },
  { path: 'research', color: 'folderColor.color28' },
  { path: 'styles', color: 'folderColor.color29' },
  { path: 'themes', color: 'folderColor.color30' },
  { path: 'source', color: 'folderColor.color31' },
  { path: 'store', color: 'folderColor.color32' },
  { path: 'pages', color: 'folderColor.color33' },
  { path: 'layouts', color: 'folderColor.color34' },
  { path: 'server', color: 'folderColor.color35' },
  { path: 'env', color: 'folderColor.color36' },
  { path: 'shared', color: 'folderColor.color37' },
  { path: 'artifacts', color: 'folderColor.color38' },
  { path: 'bin', color: 'folderColor.color39' },
  { path: 'examples', color: 'folderColor.color40' },
  { path: 'types', color: 'folderColor.color41' },
  { path: 'migrations', color: 'folderColor.color42' },
  { path: 'database', color: 'folderColor.color43' },
  { path: 'schemas', color: 'folderColor.color44' },
  { path: 'client', color: 'folderColor.color45' },
  { path: 'constants', color: 'folderColor.color46' },
  { path: 'uploads', color: 'folderColor.color47' },
  { path: 'downloads', color: 'folderColor.color48' },
  { path: 'static', color: 'folderColor.color49' },
  { path: 'images', color: 'folderColor.color50' },
  { path: 'icons', color: 'folderColor.color51' },
  { path: 'media', color: 'folderColor.color52' },
  { path: 'pipeline', color: 'folderColor.color53' },
  { path: 'seeds', color: 'folderColor.color54' },
  { path: 'tmp', color: 'folderColor.color55' },
  { path: 'videos', color: 'folderColor.color56' },
  { path: 'logging', color: 'folderColor.color57' },
  { path: 'tools', color: 'folderColor.color58' },
  { path: 'templates', color: 'folderColor.color59' },
  { path: 'third_party', color: 'folderColor.color60' },
  { path: 'monitoring', color: 'folderColor.color61' },
  { path: 'analytics', color: 'folderColor.color62' },
  { path: 'experiments', color: 'folderColor.color63' },
  { path: 'jobs', color: 'folderColor.color64' },
  { path: 'train', color: 'folderColor.color65' },
  { path: 'tasks', color: 'folderColor.color66' },
  { path: 'notes', color: 'folderColor.color67' },
  { path: 'val', color: 'folderColor.color68' },
  { path: 'diagrams', color: 'folderColor.color69' },
  { path: 'backend', color: 'folderColor.color70' },
  { path: 'environments', color: 'folderColor.color71' },
  { path: 'dev', color: 'folderColor.color72' },
  { path: 'prod', color: 'folderColor.color73' },
  { path: 'staging', color: 'folderColor.color74' },
  { path: 'feature', color: 'folderColor.color75' },
  { path: 'ai', color: 'folderColor.color76' },
  { path: 'ml', color: 'folderColor.color77' },
  { path: 'nlp', color: 'folderColor.color78' },
  { path: 'backup', color: 'folderColor.color79' },
  { path: 'app', color: 'folderColor.color80' },
  { path: 'myenv', color: 'folderColor.color81' },
  { path: 'errors', color: 'folderColor.color82' },
  { path: 'key', color: 'folderColor.color83' }
];

function getFinalFolderColors(): { path: string; color: string }[] {
  const userConfig = vscode.workspace.getConfiguration('colorFolders');
  const customOverrides = userConfig.get<Record<string, string>>('customOverrides', {});

  const userOverridesArray = Object.entries(customOverrides).map(([path, color]) => ({ path, color }));

  const map = new Map<string, string>();
  for (const entry of folderColors) {
  map.set(entry.path.toLowerCase(), entry.color);
}
for (const override of userOverridesArray) {
  map.set(override.path.toLowerCase(), override.color);
}


  return Array.from(map.entries()).map(([path, color]) => ({ path, color }));
}

export function activate(context: vscode.ExtensionContext) {
  let finalColors = getFinalFolderColors();

  const decorationChangeEmitter = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();

  const decorationProvider: vscode.FileDecorationProvider = {
    onDidChangeFileDecorations: decorationChangeEmitter.event,

    provideFileDecoration(uri: vscode.Uri): vscode.ProviderResult<vscode.FileDecoration> {
      const fsPath = uri.fsPath.toLowerCase();

      for (const folder of finalColors) {
        const folderName = folder.path.toLowerCase();
        const pattern = new RegExp(`(\\/|\\\\)${folderName}(\\/|\\\\|$)`);
        if (pattern.test(fsPath)) {
          return {
            badge: '',
            color: new vscode.ThemeColor(folder.color),
          };
        }
      }

      return;
    },
  };

  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(decorationProvider)
  );

  // Listen for user configuration changes and auto-refresh
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('colorFolders.customOverrides')) {
        finalColors = getFinalFolderColors();
        decorationChangeEmitter.fire(undefined); // 🔥 Refresh all file decorations
        vscode.window.showInformationMessage('Folder color updated.');
      }
    })
  );
}



export function deactivate() {}
