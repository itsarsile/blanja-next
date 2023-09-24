import { Box, Collapse, Group, Stack, UnstyledButton } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { URL, Url } from "url";

export interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  iconClassName?: string;
  pathName?: string;
  onClick?: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  onClick,
  iconClassName,
  pathName,
}: LinksGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened || false);
  const hasLinks = Array.isArray(links);

  const items = (hasLinks ? links : []).map((link) => (
    <Link
      href={link.link}
      key={link.label}
      className={
        pathName?.startsWith(link.link)
          ? "font-bold transition-all ease-in-out"
          : "text-slate-500 transition-all ease-in-out"
      }
    >
      {link.label}
    </Link>
  ));
  const handleButtonClick = () => {
    setOpened((o) => !o);

    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <UnstyledButton onClick={handleButtonClick}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className={iconClassName}>
              <Icon />
            </div>
            <Box ml="md" className="text-slate-500">
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <ChevronDown
              className={
                opened
                  ? `text-slate-400 transition-transform`
                  : "text-slate-400 -rotate-90 duration-100 ease-in-out"
              }
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened} className="pl-14">
          <Stack>{items}</Stack>
        </Collapse>
      ) : null}
    </>
  );
}
