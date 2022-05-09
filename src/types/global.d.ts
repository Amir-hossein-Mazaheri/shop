import React from "react";

declare global {
  declare namespace Common {
    type Id = string | number;
  }

  declare namespace Product {
    interface Collection {
      id: Common.Id;
      title: string;
    }
  }

  declare namespace Badge {
    interface BadgeText {
      text: string;
      color?: Badge.color;
      position?: Badge.position;
    }

    type color = "error" | "success" | "warning" | "inherit";
    type position = "top-right" | "top-left" | "bottom-right" | "bottom-left";
    type content = string[] | string;
  }

  declare namespace Navbar {
    interface Item {
      id: number | string;
      text: string;
      to: string;
      action?: React.MouseEventHandler;
    }
  }
}
