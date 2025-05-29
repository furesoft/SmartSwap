"use client";
import React, {useEffect} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import {Page} from '@/components/PageLayout';
import {Switch} from "@worldcoin/mini-apps-ui-kit-react";
import {useRouter} from "next/navigation";
import SetMessageDrawer from "@/components/SetMessageDrawer";
import {useGlobals} from "@/components/GlobalsContext";
import TokensPage from "@/components/TokensPage";
import {Tab, Tabs} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="w-full h-full max-w-lg mx-auto bg-white flex flex-col">
                <Tabs className="mb-3 w-full" style={{width: '100%'}} defaultActiveKey="general">
                    <Tab eventKey="general" title="General">
                        <SetMessageDrawer />
                        <div className="flex items-center gap-2 mb-4">
                            <label htmlFor="maintenance-switch" className="font-medium">Maintenance Mode</label>
                            <Switch
                                id="maintenance-switch"
                                checked={globals.maintenanceMode}
                                onChange={checked => setValue({ ...globals, maintenanceMode: checked })}
                            />
                        </div>
                    </Tab>

                    <Tab eventKey="tokens" title="Tokens">
                        <TokensPage />
                    </Tab>
                </Tabs>
            </div>
        </Page.Main>
    );
}
