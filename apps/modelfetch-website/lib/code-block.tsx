import type { HighlightOptionsCommon } from "fumadocs-core/highlight";

import { highlight } from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";

const components: HighlightOptionsCommon["components"] = {
  pre: (props) => <Base.Pre {...props} />,
};

export interface CodeBlockProps extends Base.CodeBlockProps {
  code: string;
  lang: HighlightOptionsCommon["lang"];
}

export async function CodeBlock({ code, lang, ...props }: CodeBlockProps) {
  const rendered = await highlight(code, { lang, components });
  return <Base.CodeBlock {...props}>{rendered}</Base.CodeBlock>;
}
