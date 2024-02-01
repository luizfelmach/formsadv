import { ScrollArea } from "@/components/ui/scroll-area";
import { MacOSActions } from "./macos-actions";
import { FormSettings, FormSettingsMobile } from "./form-settings";

import {
  NavbarScreenEditor,
  NavbarScreenEditorMobile,
} from "./navbar-screen-editor";
import { CurrentScreen } from "./current-screen";

export function EditorSection() {
  return (
    <main className="xl:flex justify-center">
      <ScreensSection />
      <MainSection />
      <SettingsSection />
    </main>
  );
}

function ScreensSection() {
  return (
    <aside className="h-[calc(100vh_-_3rem)] hidden xl:flex w-full flex-1 justify-center ">
      <div className="bg-accent rounded-md w-full justify-center">
        <ScrollArea className="h-[calc(100vh_-_3rem)]">
          <NavbarScreenEditor />
        </ScrollArea>
      </div>
    </aside>
  );
}

function MainSection() {
  return (
    <div className="h-[calc(100vh_-_3rem)] short:w-[900px] 2xl:w-[1200px]">
      <div className="xl:flex gap-3 hidden mt-4 ml-4 absolute z-10">
        <MacOSActions />
      </div>
      <ScrollArea className="h-[calc(100vh_-_3rem)]">
        <div className="flex justify-between">
          <NavbarScreenEditorMobile />
          <FormSettingsMobile />
        </div>
        <CurrentScreen />
      </ScrollArea>
    </div>
  );
}

function SettingsSection() {
  return (
    <aside className="h-[calc(100vh_-_3rem)] hidden xl:flex flex-1 w-full justify-center">
      <div className="bg-accent rounded-md w-full justify-center">
        <FormSettings />
      </div>
    </aside>
  );
}
