
import ComebackButton from "@/app/components/button/comeback"
import VacancyForm from "@/app/components/display/vacancy-form"
import { Navigation } from "@/app/components/navigation/navigation"

export default function Contract() {

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgb(11, 20, 11), rgb(79, 116, 82))",
      }}
    >
      <Navigation />
      <VacancyForm/>
      <ComebackButton/>
    </div>
  );
}
