import React from "react";
import { Donate } from "iconoir-react";
import { CircularIcon, Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, Button } from "@worldcoin/mini-apps-ui-kit-react";
import {openOnePay} from "@/Pay";
import getWorldChatDeeplinkUrl from "@/app/chat";

export default function DonateDrawerButton() {
  const [open, setOpen] = React.useState(false);
  const address = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

  function donate() {
      openOnePay("1000000000");

      return undefined;
  }

  function chat() {
        const url = getWorldChatDeeplinkUrl({
            username: 'filmee24',
            message: '',
        });
        window.open(url);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} height="fit">
      <DrawerTrigger asChild>
          <CircularIcon className="bg-gray-200" size="md" onClick={() => setOpen(true)}>
            <Donate />
          </CircularIcon>
      </DrawerTrigger>

      <DrawerContent className="p-6 m-5">
        <DrawerHeader>
          <DrawerTitle>Donate</DrawerTitle>
        </DrawerHeader>

        <div className="mb-4 text-gray-700">
          Thank you for considering a donation! Your support helps us maintain and improve this project.
        </div>

        <div className="mb-2 text-gray-700">Address:</div>
        <div className="font-mono break-all bg-gray-100 p-2 rounded text-sm mb-4">{address}</div>

        <Button onClick={() => donate()}>Donate with OnePay</Button>
        <Button onClick={() => chat()}>Leave a message</Button>
      </DrawerContent>
    </Drawer>
  );
}