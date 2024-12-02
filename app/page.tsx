import Main from "@/components/main";
import Form from "@/components/form";
import { transactionFormatter } from "@/actions/transactionFormatter";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center px-4">
        <Main />
        <Form actionName={transactionFormatter} />
      </main>
    </div>
  );
}
