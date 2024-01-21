import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import TableExtension from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import {
  IconTablePlus,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconColumnRemove,
  IconTrash,
  IconRowRemove,
  IconRowInsertBottom,
  IconRowInsertTop,
} from "@tabler/icons-react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useLowlight } from "@/hooks/useLowlight";
import { StyledContentContainer } from "@/atoms/StyledContentContainer";

type Props = {
  content: string;
  onChange: (content: string) => void;
};

/**
 * カスタムリッチテキストエディター
 * @param content リッチテキストエディターのコンテンツ
 * @param onChange リッチテキストエディターのコンテンツ変更時のハンドラー
 * @constructor
 */
export const CustomRichTextEditor: React.FC<Props> = ({
  content,
  onChange,
}) => {
  const { getLowlight } = useLowlight();
  const lowlight = getLowlight();
  const editor = useEditor({
    extensions: [
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" }),
      TableExtension.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  if (!editor) {
    return null;
  }

  return (
    <StyledContentContainer>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              aria-label="Insert table"
              title="Insert table"
            >
              <IconTablePlus stroke={1.5} size="1rem" />
            </RichTextEditor.Control>

            {/* 行を追加 */}
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().addRowBefore().run()}
              title="Add Row Top"
            >
              <IconRowInsertTop size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title="Add Row Bottom"
            >
              <IconRowInsertBottom size="1rem" stroke={1.5} />
            </RichTextEditor.Control>

            {/* 行を削除 */}
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Delete Row"
            >
              <IconRowRemove size="1rem" stroke={1.5} />
            </RichTextEditor.Control>

            {/* 列を追加 */}
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              title="Add Column Left"
            >
              <IconColumnInsertLeft size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add Column After"
            >
              <IconColumnInsertRight size="1rem" stroke={1.5} />
            </RichTextEditor.Control>

            {/* 列を削除 */}
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Delete Column"
            >
              <IconColumnRemove size="1rem" stroke={1.5} />
            </RichTextEditor.Control>

            {/* テーブルを削除 */}
            <RichTextEditor.Control
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
            >
              <IconTrash size="1rem" />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
          <RichTextEditor.UnsetColor />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </StyledContentContainer>
  );
};
