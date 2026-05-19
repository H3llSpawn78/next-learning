import Header from "@/app/components/Header";
import Users from "@/app/zodFormMui/components/Users";

export default function ZodFormMui() {
  return (
    <>
      <Header headingText="RHF, ZOD & MUI" />
      <div className="container mx-auto max-wmx-auto max-w-xl p-4">
        <Users />
      </div>
    </>
  );
}
