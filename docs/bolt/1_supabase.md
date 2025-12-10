# Mode 1: Building from Scratch with Supabase (No Backend)

Use this mode when starting a new project where the backend doesn't exist yet. You'll develop the app with a temporary Supabase backend, then generate an OpenAPI specification for the backend team to use as a reference.

---

# Setup

**Initialize project in Bolt**: http://bolt.new/github.com/povio/bolt-rn-template

# Common Issues

These are common pitfalls and bugs you might encounter. Click to jump to detailed explanations:

2. **[Submitting a form does nothing](#forms)** - Required data appended during submission causes validation errors
3. **[OpenAPI spec generation exceeded token limit](#data-layer)** - Exceeding token limits when generating large specs

---

# Prompting

- Keep prompts to max one new feature at a time
- When fixing bugs, give more technical directions on how to fix if possible
- After each prompt Bolt creates a checkpoint that you can revert back to
- You can also edit code manually and run commands in the terminal

## First Prompt

Give a rough overview of the app and tell it to only implement user authentication in the first prompt:

```
Build me an app named ... which will have the features ... Start with the user authentication - implement the sign-up and login screens. Logged in users should be redirected to...
```

Bolt should replace the mock authentication code with its Supabase integration. Make sure it did this step correctly (check Authentication section).

## Design & Styling

By default, Bolt apps may look "bland" because the AI by default only styles components via props from the generated theme (Atlas defaults unless changed).

**If you have a design or concept available:**

- Generate your theme from Figma and override the defaults
- Provide Bolt with screenshots, mockups, or design references
- Tell it explicitly to match the design, including colors
- Bolt will implement the design and use appropriate colors beyond blue
- If allowed, you may tell it to use `style` overrides on the components to give it more freedom

Example:

```
Here's a screenshot of the design I want. Implement this page matching the design,
including the color scheme shown in the image.
```

---

# Rules & Possible Pitfalls

## Data Layer

**During Development:**

- All data operations go through `data/` folder
- Supabase provides real-time backend functionality
- Data structure:
  ```
  data/
  └── posts/
      ├── posts.queries.ts   # React Query hooks
      └── posts.models.ts    # Zod schemas
  ```

**Generating OpenAPI Spec:**

Once your data model is stable and finished, ask Bolt:

```
Generate an OpenAPI specification based on the current data layer.
Follow the rules in `rules/openapi-rules.md`
```

This creates an `openapi.json` file that the backend team can use as reference. You can verify the spec by running `npm run openapi:gen` and see if the Codegen CLI can parse it.

**NOTE:** if your data layer is large, ask Bolt to generate it in parts with multiple prompts, otherwise it will exceed a prompt token limit and not give you any result. Try sticking to max 5 modules per prompt. If it still exceeds a limit when adding new modules to the spec, explicitly tell it to modify the existing file instead of creating a new one.

## Authentication

- Bolt should set up Supabase Auth automatically when implementing authentication
- Make sure Bolt correctly updates the mock auth implementation in the template
- The authentication logic will need to be switched to JWT when migrating to Backend

## Forms

Bolt should by default `useForm` from `react-hook-form`.

Validation is done through the `zodSchema` parameter, where Bolt passes the appropriate Zod schema from `data/*.models.ts`.

**Possible bug:** if some required data only gets appended **during the form submission**, the form validation can fail and your onSubmit handler will not trigger. To avoid this, make sure that all required data in the Zod schema is actually added to the form hook's state.

## File Upload

- Ask Bolt to implement file upload for your use case
- It will create its own bucket and integrate it with Supabase
- This logic will need to be updated when migrating to Backend

---

# Moving from Bolt

When moving from Bolt you may:

1. **Export Project**

   - Click on the chat/project name on top left
   - Export > Download

2. **Switch back to yarn**

   - Delete `package-lock.json`
   - Specify yarn in `package.json`:

   ```json
    {
      "packageManager": "yarn@1.22.22"
    }
   ```

3. **Migration to Backend**
   - Update `openapi-codegen.config.ts` OpenAPI spec input path
     ```ts
     const config: OpenAPICodegenConfig = {
        input: "https://api.dev.pov.io/api/docs-json", // Your backend openapi spec path
        /// ...
     }
     ```
   - Generate data layer:
     ```bash
     yarn openapi:gen
     ```
   - Update authentication to use JWT
   - Update all usages of React Query hooks and Zod models to their corresponding ones in `/openapi`
     - Migrate all file upload logic to the backend's system
   - Remove old Supabase code - when whole app is migrated
     - Remove `migrations` and `data` folders
     - Remove `utils/supabase.ts`
     - Remove "@supabase/supabase-js" package
     - Remove Supabase env variables
