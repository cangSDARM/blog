import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "next/link";
import classes from "./style.module.scss";

const parse = (content: any) => {
  if (typeof content === "string") return content;

  return content.map((c: any) => <p key={c}>{String(c)}</p>);
};

const CommentHeader: React.FC = () => {
  React.useLayoutEffect(() => {
    const comment = document.querySelector("[data-is-comment]");
    const header = document.querySelector("[data-is-comment-header]");
    if (!header && comment) {
      comment.insertAdjacentHTML(
        "beforebegin",
        `<div style="font-size:1.25em;margin-block:1em;display:flex;align-items:center;" data-is-comment-header>评论<hr style="flex:1;"/></div>`
      );
    }
  }, []);

  return <></>;
};

const Comment: React.FC<
  React.PropsWithChildren<{
    location: string;
    critic: string;
    href: string;
  }>
> = ({ location, critic, children, href }) => {
  const [open, setOpen] = React.useState(true);

  if (!children) return <></>;

  return (
    <>
      <CommentHeader />
      <Collapsible.Root
        open={open}
        className={classes.CollapsibleRoot}
        onOpenChange={setOpen}
        data-is-comment
      >
        <Collapsible.Trigger
          className={classes.CollapsibleHeading}
          title={open ? "close" : "open"}
        >
          <span>{critic}</span>
          <div>
            <span>{location ? location : "未知"}</span>
            <Link target="_blank" href={href}>
              {href}
            </Link>
          </div>
        </Collapsible.Trigger>

        <Collapsible.Content className={classes.CollapsibleContent}>
          {parse(children)}
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
};

export default Comment;
