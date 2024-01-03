import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import tsLanguageSyntax from "highlight.js/lib/languages/typescript";
import jsLanguageSyntax from "highlight.js/lib/languages/javascript";
import pythonLanguageSyntax from "highlight.js/lib/languages/python";
import goLanguageSyntax from "highlight.js/lib/languages/go";
import rubyLanguageSyntax from "highlight.js/lib/languages/ruby";
import shellLanguageSyntax from "highlight.js/lib/languages/shell";
import cLanguageSyntax from "highlight.js/lib/languages/c";
import javaLanguageSyntax from "highlight.js/lib/languages/java";
import kotlinLanguageSyntax from "highlight.js/lib/languages/kotlin";
import jsonLanguageSyntax from "highlight.js/lib/languages/json";
import xmlLanguageSyntax from "highlight.js/lib/languages/xml";
import yamlLanguageSyntax from "highlight.js/lib/languages/yaml";
import sqlLanguageSyntax from "highlight.js/lib/languages/sql";
import phpLanguageSyntax from "highlight.js/lib/languages/php";
import perlLanguageSyntax from "highlight.js/lib/languages/perl";
import htmlLanguageSyntax from "highlight.js/lib/languages/xml";
import cssLanguageSyntax from "highlight.js/lib/languages/css";
import rustLanguageSyntax from "highlight.js/lib/languages/rust";
import scssLanguageSyntax from "highlight.js/lib/languages/scss";
import swiftLanguageSyntax from "highlight.js/lib/languages/swift";
import dartLanguageSyntax from "highlight.js/lib/languages/dart";

lowlight.registerLanguage("typescript", tsLanguageSyntax);
lowlight.registerLanguage("ts", tsLanguageSyntax);
lowlight.registerLanguage("tsx", tsLanguageSyntax);
lowlight.registerLanguage("javascript", jsLanguageSyntax);
lowlight.registerLanguage("js", jsLanguageSyntax);
lowlight.registerLanguage("jsx", jsLanguageSyntax);
lowlight.registerLanguage("python", pythonLanguageSyntax);
lowlight.registerLanguage("py", pythonLanguageSyntax);
lowlight.registerLanguage("go", goLanguageSyntax);
lowlight.registerLanguage("ruby", rubyLanguageSyntax);
lowlight.registerLanguage("rb", rubyLanguageSyntax);
lowlight.registerLanguage("shell", shellLanguageSyntax);
lowlight.registerLanguage("sh", shellLanguageSyntax);
lowlight.registerLanguage("bash", shellLanguageSyntax);
lowlight.registerLanguage("zsh", shellLanguageSyntax);
lowlight.registerLanguage("c", cLanguageSyntax);
lowlight.registerLanguage("java", javaLanguageSyntax);
lowlight.registerLanguage("kotlin", kotlinLanguageSyntax);
lowlight.registerLanguage("php", phpLanguageSyntax);
lowlight.registerLanguage("rust", rustLanguageSyntax);
lowlight.registerLanguage("swift", swiftLanguageSyntax);
lowlight.registerLanguage("dart", dartLanguageSyntax);
lowlight.registerLanguage("perl", perlLanguageSyntax);
lowlight.registerLanguage("json", jsonLanguageSyntax);
lowlight.registerLanguage("xml", xmlLanguageSyntax);
lowlight.registerLanguage("yaml", yamlLanguageSyntax);
lowlight.registerLanguage("sql", sqlLanguageSyntax);
lowlight.registerLanguage("html", htmlLanguageSyntax);
lowlight.registerLanguage("css", cssLanguageSyntax);
lowlight.registerLanguage("scss", scssLanguageSyntax);

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
  const editor = useEditor({
    extensions: [
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
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
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
