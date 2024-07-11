import * as vscode from 'vscode';
import { suggestions } from './suggestion';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('mudah-hidupmu.formatfile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const fullText = document.getText();
        const fileExtension = document.fileName.split('.').pop();

        let formattedText: string;
        if (fileExtension === 'js') {
            formattedText = fullText.replace(/"([^"]*)"/g, (match, p1) => {
                const suggestionCode = suggestions[p1.trim()];
                if (suggestionCode) {
                    return `jexML.get("JS_${suggestionCode}") ?? "${p1}"`;
                }
                return match;
            });
        } else {
            formattedText = fullText.replace(/>([A-Za-z\s]+)</g, (match, p1) => {
                const suggestionCode = suggestions[p1.trim()];
                if (suggestionCode) {
                    return ` data-jex-ml="${suggestionCode}">${p1}<`;
                }
                return match;
            });
        }

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(fullText.length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, formattedText);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
