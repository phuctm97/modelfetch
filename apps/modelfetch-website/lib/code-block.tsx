import type { HighlightOptionsCommon } from "fumadocs-core/highlight";
import type { CodeBlockProps as FumadocsCodeBlockProps } from "fumadocs-ui/components/codeblock";
import type { Except } from "type-fest";

import { highlight } from "fumadocs-core/highlight";
import {
  CodeBlock as FumadocsCodeBlock,
  Pre as FumadocsPre,
} from "fumadocs-ui/components/codeblock";

const components: HighlightOptionsCommon["components"] = {
  pre: (props) => <FumadocsPre {...props} />,
};

export interface CodeBlockProps
  extends Except<FumadocsCodeBlockProps, "children"> {
  code: string;
  lang: HighlightOptionsCommon["lang"];
}

export async function CodeBlock({ code, lang, ...props }: CodeBlockProps) {
  const children = await highlight(code, { lang, components });
  return <FumadocsCodeBlock {...props}>{children}</FumadocsCodeBlock>;
}
