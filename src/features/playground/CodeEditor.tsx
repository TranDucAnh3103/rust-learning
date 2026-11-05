import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { rust } from '@codemirror/lang-rust';
import { oneDark } from '@codemirror/theme-one-dark';
import { bracketMatching, defaultHighlightStyle, syntaxHighlighting, indentOnInput } from '@codemirror/language';

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  height = '420px',
  readOnly = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const isUpdatingFromPropRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Custom dark theme extensions to seamlessly integrate with RustForge glass styling
    const customTheme = EditorView.theme(
      {
        '&': {
          height: '100%',
          backgroundColor: '#0a0e17',
          color: '#e2e8f0',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13.5px',
        },
        '.cm-scroller': {
          overflow: 'auto',
          lineHeight: '1.6',
        },
        '.cm-gutters': {
          backgroundColor: '#070a10',
          color: '#64748b',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.cm-activeLine': {
          backgroundColor: 'rgba(255, 255, 255, 0.035)',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          color: '#f97316',
        },
        '&.cm-focused': {
          outline: 'none',
        },
        '.cm-selectionBackground, ::selection': {
          backgroundColor: 'rgba(249, 115, 22, 0.25) !important',
        },
      },
      { dark: true }
    );

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged && !isUpdatingFromPropRef.current) {
        const docString = update.state.doc.toString();
        onChange(docString);
      }
    });

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        rust(),
        oneDark,
        customTheme,
        EditorState.readOnly.of(readOnly),
        updateListener,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); // Run once on mount

  // Sync external value changes (e.g., when resetting code or loading an exercise)
  useEffect(() => {
    const view = viewRef.current;
    if (view) {
      const currentVal = view.state.doc.toString();
      if (value !== currentVal) {
        isUpdatingFromPropRef.current = true;
        view.dispatch({
          changes: { from: 0, to: currentVal.length, insert: value },
        });
        isUpdatingFromPropRef.current = false;
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden border border-white/10 shadow-inner"
      style={{ height }}
    />
  );
};
