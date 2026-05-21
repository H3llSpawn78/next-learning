import Header from "@/app/components/Header";
import { UsersFormProvider } from "@/app/zodFormMui/components/UsersFormProvider";

export default function ZodFormMui() {
  return (
    <>
      <Header headingText="RHF, ZOD & MUI" />
      <div className="container mx-auto max-wmx-auto max-w-xl p-4">
        <UsersFormProvider />
      </div>
    </>
  );
}
