import {
    BottomBar,
    Button,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger, Input, LiveFeedback
} from "@worldcoin/mini-apps-ui-kit-react";
import React, { useEffect } from "react";
import {useState} from "react";
import { useMessage } from "@/components/MessageContext";

export default function SetMessageDrawer() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState<string>("");
    const { setMessage, message } = useMessage();

    useEffect(() => {
        if (open) setInput(message || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleDrawerOpen = (open: boolean) => {
        setOpen(open);
    };

    const sendMessage = () => {
        setMessage(input);
        setOpen(false);

        return undefined;
    };

    return (
        <>
            <Drawer height="full" repositionInputs open={open} onOpenChange={handleDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button variant="secondary" size="sm" onClick={() => handleDrawerOpen(true)}>
                        Set Message
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-6 grow flex flex-col justify-between">
                        <DrawerHeader>
                            <DrawerTitle>Set Message</DrawerTitle>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 pt-4">
                            <Input label="Type here your message" value={input} onChange={e => setInput(e.target.value)} />
                        </div>
                        <BottomBar direction="horizontal">
                            <React.Fragment key=".0">
                                    <Button fullWidth variant="secondary" onClick={() => handleDrawerOpen(false)}>
                                        Cancel
                                    </Button>

                                    <Button onClick={sendMessage} className="mt-3 w-full" variant="primary" fullWidth>
                                        OK
                                    </Button>
                            </React.Fragment>
                        </BottomBar>
                </DrawerContent>
            </Drawer>
        </>
    );
};

