# Povio Bolt RN Template

A slightly modified version of the [Povio React Native Template](https://github.com/povio/react-native-template). Key changes:

- Switched from yarn to npm (Bolt only uses npm)
- Temporarily removed Storybook and some testing libraries for npm compatibility
- Added general bolt rules
- Added @povio/openapi-codegen-cli
- Added OpenAPI spec generation rules (remove if not needed)
- Prepared Supabase setup (remove if not needed)

**NOTE:** web preview of the app currently does not work/takes very long to show inside of Bolt. Scan the QR code in the terminal and test the app through your phone.

## Usage Modes

This template supports two distinct development workflows:

### Mode 1: Building from Scratch (No Backend)

**When to use:** Starting a new project where the backend doesn't exist yet. You'll develop the frontend with a temporary Supabase backend, then generate an OpenAPI specification for the backend team to implement.

**Get started:**

```
http://bolt.new/github.com/povio/bolt-rn-template
```

📖 **[Read the full Mode 1 documentation](docs/bolt/1_supabase.md)**

---

### Mode 2: Backend Ready (Existing Backend)

**When to use:** Backend is already developed or being developed in parallel and is deployed with an accessible OpenAPI specification endpoint.

**Get started:**

```
http://bolt.new/github.com/povio/bolt-rn-template/tree/external-be
```

📖 **[Read the full Mode 2 documentation](docs/bolt/2_external_api.md)**

---

## Reference Examples

The template comes with a pre-implemented example "flowers" feature with screens, modules and a data layer. This code can be used as a reference for yourself and Bolt. The code can be removed if Bolt does not remove it automatically.

---

## Additional Resources

- **Mode-specific Documentation**: `docs/bolt/` directory
- **General Bolt rules**: `.bolt/prompt`

---

## Support

For issues or suggestions regarding Bolt:

- Check the mode-specific documentation in `docs/bolt`
- Contact "Tadej Rebernjak" on Slack

For issues or suggestions regarding the RN template:

- Check `docs/`
- Check https://github.com/povio/react-native-template for more information
