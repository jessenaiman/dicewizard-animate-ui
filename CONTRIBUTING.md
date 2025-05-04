# Contributing to Animate UI

Thank you for your interest in **contributing to Animate UI**! Your support is highly appreciated, and we look forward to your contributions. This guide will help you understand the project structure and provide detailed instructions for adding a new component or effect to Animate UI.

**Note:** You only need to modify a few files to add a new component, and it should take you around 10 minutes to complete.

## Getting Started

### Fork and Clone the Repository

#### 1. Fork the Repository

Click [here](https://github.com/animate-ui/animate-ui/fork) to fork the repository.

#### 2. Clone your Fork to Your Local Machine

```bash
  git clone https://github.com/<YOUR_USERNAME>/animate-ui.git
```

#### 3. Navigate to the Project Directory

```bash
cd animate-ui
```

#### 4. Create a New Branch for Your Changes

```bash
git checkout -b my-branch
```

#### 5. Install Dependencies

```bash
pnpm i
```

#### 6. Run the Project

```bash
pnpm dev
```

## Edit a Component

If you need to modify a component to correct or improve it, you must :

- add a screenshot (photo or video as appropriate) of before and after the modification
- clearly explain why you made the modification

### Edit the code

Edit the component in the `registry` folder. Don't forget to adapt the demo and documentation if necessary.

You shouldn't change your behavior completely unless there's a good reason.

### Build the Registry

To update the registry, run the following command:

```bash
pnpm registry:build
```

## Adding a New Component

The addition of a new component must comply with certain rules:

- The component must be animated in some way (css, motion, ...).
- You can't just copy/paste component code from other libraries. You can be inspired by a component, but it must have added value. For example, I took Shadcn's components and animated them. So I didn't copy and paste the component, I added something to it.
- If you take inspiration from a component (CodePen, another library, etc.), remember to add the “Credits” section to your documentation. It's important to respect the work of other developers.

To submit your component, please include a demo video in the MR. Once the component has been submitted, it must be validated by @imskyleen.

To **add a new component to Animate UI**, you will need to update several files. Follow these steps:

### Create the Component

#### Basics

Create your main component in `apps/www/registry/[category]/my-component/index.tsx`.

```tsx title="my-component/index.tsx"
'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.ComponentProps<'div'>;

function MyComponent({ myProps, ...props }, ref) {
  return <div {...props}>{/* Your component */}</div>;
}

export { MyComponent, type MyComponentProps };
```

#### Update the Registry

Create a `apps/www/registry/[category]/my-component/registry-item.json` file to export your component :

```json title="my-component/registry-item.json"
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "My Component Description",
  "dependencies": [...],
  "devDependencies": [...],
  "files": [
    {
      "path": "registry/[category]/my-component/index.tsx",
      "type": "registry:ui",
      "target": "components/animate-ui/my-component.tsx"
    }
  ]
}
```

#### Add a Tweakpane

You can add a Tweakpane allowing users to play with your demo props.

Your demo must accept the props you want in your tweakpane :

```tsx title="my-component-demo/index.tsx"
import { MyComponent } from '@/registry/[category]/my-component';

type MyComponentDemoProps = {
  props1: number;
  props2: number;
  props3: string;
  props4: string;
  props5: boolean;
};

export function MyComponentDemo({
  props1,
  props2,
  props3,
  props4,
  props5,
}: MyComponentDemoProps) {
  return <MyComponent />;
}
```

You must then specify the demo props information in your demo's `registry-item.json` file:

```json title="my-component-demo/registry-item.json"
{
  ...
  "meta": {
    "demoProps": {
      "MyComponent": {
        "props1": { "value": 700, "min": 0, "max": 2000, "step": 100 },
        "props2": { "value": 0 },
        "props3": { "value": "foo" },
        "props4": {
          "value": "center",
          "options": {
            "start": "start",
            "center": "center",
            "end": "end"
          }
        },
        "props5": { "value": true }
      }
    }
  },
 ...
}
```

**You need to run `pnpm registry:build` to see the updated tweakpane in the demo.**

#### How to use `demoProps`

##### Number

Simple number input:

```json
"myNumber": { "value": 10 }
```

Slider:

```json
"myNumber": { "value": 10, "min": 0, "max": 100, "step": 1 }
```

Select:

```json
"myNumber": {
  "value": 10,
  "options": {
    "Big": 30,
    "Medium": 20,
    "Small": 10
  }
}
```

##### String

Simple text input:

```json
"myString": { "value": "Hello World" }
```

Select:

```json
"myNumber": {
  "value": "small",
  "options": {
    "Big": "big",
    "Medium": "medium",
    "Small": "small"
  }
}
```

##### Boolean

```json
"myBoolean": { "value": true }
```

### Update the Documentation Sidebar

Add your component to the documentation sidebar by updating the file `content/docs/meta.json`.

```json title="meta.json"
{
  "title": "Animate UI",
  "root": true,
  "pages": [
    ...,
    "[category]/my-component"
    ...
  ]
}
```

### Create the Component Documentation

Create an MDX file to document your component in `content/docs/[category]/my-component.mdx`.

```mdx
---
title: My Component
description: Description for the new component
author:
  name: your name
  url: https://link-to-your-profile.com
new: true
---

<ComponentPreview name="my-component-demo" />

## Installation

<ComponentInstallation name="my-component" />

## Usage

[Basic usage of the component]

## Props

<TypeTable
  type={{
    myProps: {
      description: 'Description for my props',
      type: 'string',
      required: true,
    },
  }}
/>

## Credits

- Credits to [you](https://link-to-your-profile.com) for creating the component
```

### Build the Registry

To update the registry, run the following command:

```bash
pnpm registry:build
```

## Ask for Help

If you need any assistance or have questions, please feel free to open a [GitHub issue](https://github.com/animate-ui/animate-ui/issues/new). We are here to help!

Thank you again for your contribution to Animate UI! We look forward to seeing your improvements and new components.
