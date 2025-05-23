import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/registry/base/accordion';

interface BaseAccordionDemoProps {
  multiple: boolean;
}

export const BaseAccordionDemo = ({ multiple }: BaseAccordionDemoProps) => {
  return (
    <Accordion
      defaultValue={['item-1']}
      openMultiple={multiple}
      className="max-w-[400px] w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Animate UI?</AccordionTrigger>
        <AccordionPanel>
          Animate UI is an open-source distribution of React components built
          with TypeScript, Tailwind CSS, and Motion.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How is it different from other libraries?
        </AccordionTrigger>
        <AccordionPanel>
          Instead of installing via NPM, you copy and paste the components
          directly. This gives you full control to modify or customize them as
          needed.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is Animate UI free to use?</AccordionTrigger>
        <AccordionPanel>
          Absolutely! Animate UI is fully open-source. You can use, modify, and
          adapt it to fit your needs.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
