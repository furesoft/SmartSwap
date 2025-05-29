"use client";
import React, {useEffect} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import {Page} from '@/components/PageLayout';
import {Button, CircularIcon, Switch} from "@worldcoin/mini-apps-ui-kit-react";
import {useRouter} from "next/navigation";
import SetMessageDrawer from "@/components/SetMessageDrawer";
import {useGlobals} from "@/components/GlobalsContext";
import {Sphere} from "iconoir-react";

export default function Admin() {
    const {setTitle} = usePageTitle();
    const router = useRouter();
    const { globals, setValue } = useGlobals();

    useEffect(() => {
        setTitle("Admin");
    }, [setTitle]);

    function navigate(path: string) {
        router.push(`/admin/${path}`);
        return undefined;
    }

    return (
        <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
                <SetMessageDrawer />
                <div className="flex items-center gap-2 mb-4">
                    <label htmlFor="maintenance-switch" className="font-medium">Maintenance Mode</label>
                    <Switch
                        id="maintenance-switch"
                        checked={globals.maintenanceMode}
                        onChange={checked => setValue({ ...globals, maintenanceMode: checked })}
                    />
                </div>
                <Button variant="secondary" onClick={() => navigate("tokens")}>
                    <CircularIcon className="bg-gray-200" size="xs">
                        <Sphere />
                    </CircularIcon>

                    Tokens
                </Button>
            </div>
        </Page.Main>
    );
}
