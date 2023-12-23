import { FC } from "react";
import { Blockquote } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const Description: FC = () => {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote color="blue" icon={icon}>
      これは、Tauriを使用してどのようなことができるか調査するアプリです。
    </Blockquote>
  );
};

export default Description;
