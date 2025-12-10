# Mode 2: Backend Ready with External API

Use this mode when the backend is already developed or being developed in parallel and is deployed with an accessible OpenAPI specification endpoint.

---

# Setup

1. **Initialize project in Bolt**: http://bolt.new/github.com/povio/bolt-rn-template/tree/external-be

2. **Configure OpenAPI codegen**

   - Open `openapi-codegen.config.ts`
   - Update the `input` URL to point to your OpenAPI spec endpoint:
     ```typescript
     const config: OpenAPICodegenConfig = {
       input: "https://api.dev.pov.io/api/docs-json", // Your backend openapi spec path
       // ... rest of config
     };
     ```

3. **Generate data layer**
   ```bash
   npm run openapi:gen
   ```

---

# Common Issues

These are common pitfalls and bugs you might encounter. Click to jump to detailed explanations:

1. **[Bolt tries to setup and use Supabase](#first-prompt)** - In your first prompt, explicitly tell it to use the external API
2. **[Submitting a form does nothing](#forms)** - Required data appended during submission causes validation errors
3. **[File upload resourceName errors](#file-upload)** - Backend doesn't accept the specified resourceName

---

# Prompting

- Keep prompts to max one new feature at a time
- If Bolt can't find the correct queries/models to use for a feature, tell it explicitly what to use
- When fixing bugs, give more technical directions on how to fix if possible
- After each prompt Bolt creates a checkpoint that you can revert back to
- You can also edit code manually and run commands in the terminal

## First Prompt

Give a rough overview of the app and tell it to only implement user authentication in the first prompt. **Tell it explicitly that it must use the provided external API!**

```
Build me an app named ... which will have the features ... Start with the user authentication - implement the sign-up and login screens. Logged in users should be redirected to...

Use the provided external REST API - all queries and mutations were generated inside /openapi.
```

Bolt should replace the mock authentication logic to use the accessToken which the Backend provides. Make sure it did this step correctly.

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

The data layer is generated from the OpenAPI specification using `@povio/openapi-codegen-cli`. Bolt should automatically be able to find and use the correct queries and models for specific features assuming they are named and documented well enough. Otherwise point it to the correct hooks it needs to use in your prompts.

**Updating Data Layer:**

When backend changes are deployed:

```bash
npm run openapi:gen
```

## Authentication

- Bolt should set up JWT Auth automatically when implementing authentication
- Make sure Bolt correctly updates the mock auth implementation in the template

## Forms

Bolt should by default `useForm` from `react-hook-form`.

Validation is done through the `zodSchema` parameter, where Bolt passes the appropriate Zod schema from `data/*.models.ts`.

**Possible bug:** if some required data only gets appended **during the form submission**, the form validation can fail and your onSubmit handler will not trigger. To avoid this, make sure that all required data in the Zod schema is actually added to the form hook's state.

## File Upload

TODO WIP

- General file upload flow:
  - Get upload instructions from Backend (receive back instructions and the media ID)
  - Upload file following the instructions
  - Set the media ID to the resource which uses the uploaded file (create or update mutation)
- Tell Bolt to implement this flow
- MediaQueries.useUploadRequest is the default name of the get instructions hook

**Possible bug:** When fetching upload instructions, `resourceName` must be set to a value the Backend accepts. Below is a list of defaults from the monorepo template, contact Backend if they were changed:

| resourceName    | Accepted mimeTypes                                                    | Max size |
| --------------- | --------------------------------------------------------------------- | -------- |
| small-image     | image/jpeg, image/png                                                 | 2 MB     |
| large-image     | image/jpeg, image/png                                                 | 20 MB    |
| compressed-file | application/zip, application/x-rar-compressed, application/gzip, etc. | 50 MB    |
| document        | document files                                                        | 50 MB    |
| any             | \*/\*                                                                 | 100 MB   |

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
