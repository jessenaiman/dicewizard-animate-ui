import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/registry/headless/headless-accordion';

export const HeadlessAccordionDemo = () => {
  return (
    <Accordion className="w-[400px]">
      <AccordionItem defaultOpen>
        <AccordionTrigger>What is Animate UI?</AccordionTrigger>
        <AccordionContent>
          Animate UI is an open-source distribution of React components built
          with TypeScript, Tailwind CSS, and Motion.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>
          How is it different from other libraries?
        </AccordionTrigger>
        <AccordionContent>
          Instead of installing via NPM, you copy and paste the components
          directly. This gives you full control to modify or customize them as
          needed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Is Animate UI free to use?</AccordionTrigger>
        <AccordionContent>
          Absolutely! Animate UI is fully open-source. You can use, modify, and
          adapt it to fit your needs.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
