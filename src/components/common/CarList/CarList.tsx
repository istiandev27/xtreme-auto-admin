import Link from "next/link";
import { Button } from "../../elements/Buttons/Button";
import { SectionContainer } from "../../elements/SectionContainer";
import { Typography } from "../../elements/Typography";

export const CarList = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Typography variant="h3" className="font-JacquesM">
        Document has been added successfully
      </Typography>
      <Link href="/">
        <Button variant="secondary">Add Car</Button>
      </Link>
    </div>
  );
};
