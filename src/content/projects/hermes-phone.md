---
title: Hermes Phone
description: A Hermes Agent plugin that turns a Bluetooth-paired mobile phone into a voice assistant for calls, reminders, and caller-aware workflows.
url: https://github.com/virusz4274/hermes-phone-hfp
featured: true
order: 3
---

## Call your assistant on a regular phone

Hermes Phone gives Hermes Agent a telephone interface. Pair a mobile phone with a Linux machine over Bluetooth, configure who can call, and talk to your assistant through a normal cellular call. The paired handset supplies the cellular connection; Hermes supplies the assistant and its tools.

It can be a personal assistant you call when you need something done, or a restricted receptionist for known callers and guests. The same setup also supports outgoing calls and phone reminders.

The project is open source under the MIT license and is currently a public preview. The [development branch](https://github.com/virusz4274/hermes-phone-hfp/tree/development) contains the latest work described here; `main` is the reviewed preview branch.

## What you can do

### Talk to Hermes and use its tools

Call from your configured number to ask questions or delegate tasks to Hermes. Gemini Live handles the spoken conversation, including interruption, while actions go through Hermes and its normal approvals. A classic speech-to-text and text-to-speech backend is also available.

Calendar lookups, bookings, and other business actions depend on the integrations you have installed and authorized in Hermes. The phone plugin connects the conversation to those capabilities; it does not include a calendar or booking service of its own.

### Give different callers different access

Your number can route to your personal profile. Known callers can use dedicated profiles with a limited set of caller-aware tools, while an optional guest route can answer unknown callers. Without a guest route, unknown callers are declined.

This makes a receptionist-style setup possible without giving every caller access to your personal assistant's memory or tools. A built-in message-taking tool and owner inbox are still planned, so this is not yet a complete office phone system.

### Make calls with a purpose

From a configured Hermes owner chat, you can ask it to call someone with a specific objective. The call receives a brief explaining whose behalf Hermes is calling on, what it needs to discuss, and any relevant constraints.

New outgoing destinations do not need an incoming caller route. Their automatic route is limited to conversation, phone status, and their own notes; it does not grant access to your private tools. If the call needs to perform an external action, that requires an explicitly configured route and the appropriate integration.

### Set reminders and manage follow-up

The development workflow supports reminders by phone call, a notification through Hermes's configured gateway destination, or both. Call-only reminders do not require Telegram. Missed-call retries can be configured, and pending callbacks can be moved or cancelled.

Hermes owns the schedule and the follow-up decisions; the plugin executes the calls. A connected call is tracked separately from whether the objective was completed. For broader call objectives, follow-up decisions use retained evidence of what happened during the call.

With continuation enabled for an authorized admin caller, substantial tasks can also keep running after hangup and send completion results through configured Telegram delivery.

## How the phone and agent connect

Bluetooth Hands-Free Profile, or HFP, is the connection normally used between a phone and a hands-free device. Hermes Phone uses that connection to carry call control and audio between the handset and the Linux host.

There are two running components:

- **The HFP daemon** handles Bluetooth, call routing, audio, and the voice backends.
- **Your existing Hermes gateway**, with the phone plugin installed, handles authorized agent work, caller permissions, and integration with Hermes's native scheduling and delivery.

Only one Hermes plugin, `hfp-phone`, needs to be installed. The daemon and Hermes have separate Python environments, so the Bluetooth service's dependencies do not replace Hermes's own MCP dependencies.

For live voice, Gemini streams the conversation and delegates actions to Hermes. It does not execute arbitrary tools directly or approve its own actions. In classic mode, speech uses the selected profile's STT/TTS providers instead.

## Memory that follows the caller

Caller notes are scoped to the phone number and routed profile. They can retain useful facts, decisions, and commitments across calls, and the owner can inspect or update them from Hermes chat. Revision checks protect note updates from silently overwriting newer changes.

Remembering facts and retaining dialogue are separate choices. Full transcripts are off by default. Conversation continuity is a separate opt-in for routes that should resume earlier dialogue, and it stores text even when general transcript reporting is disabled.

Caller ID selects the route; it does not prove who is speaking. Normal Hermes approvals should remain enabled for admin callers. Voice is processed by Gemini or your configured speech providers, so this is not an entirely offline assistant. See the [security and data-handling guide](https://github.com/virusz4274/hermes-phone-hfp/blob/development/SECURITY.md) for the storage and access model.

## Try it on your own setup

The preview targets Debian-family Linux and Raspberry Pi OS with systemd, Python 3.11–3.13, a Bluetooth controller that supports SCO audio over HCI, and an HFP-capable mobile phone. You also need an existing Hermes installation and credentials for your chosen voice backend.

The [installation guide](https://github.com/virusz4274/hermes-phone-hfp/blob/development/docs/install.md) walks through the setup:

1. Install the Bluetooth daemon and pair the handset.
2. Install the phone plugin into your existing Hermes environment.
3. Configure your calling number, profile, permissions, and voice backend.
4. Validate routing, start the Hermes gateway, and run the health checks.
5. Test an actual call, including two-way audio and the expected caller permissions.

One personal profile is enough to begin; additional caller and guest profiles are optional. The host installer changes Bluetooth configuration and restarts Bluetooth, so read the prerequisites and backup guidance before running it.

## Preview status and current limits

Call audio currently uses narrowband CVSD at 8 kHz; wideband mSBC is not implemented. Handset and adapter compatibility varies, and the documented automated checks do not establish working audio on every hardware combination. The latest native call workflow also has live acceptance scenarios still pending.

The project includes automated coverage for routing, caller isolation, permissions, memory, task handling, and scheduling. Hardware calls, provider behavior, and audio quality still need testing on the actual setup. The compatibility guide includes the hardware acceptance steps for checking a setup.

For the implementation and current setup details:

- [Source and project overview](https://github.com/virusz4274/hermes-phone-hfp)
- [Latest development work](https://github.com/virusz4274/hermes-phone-hfp/tree/development)
- [Caller routing, memory, and configuration](https://github.com/virusz4274/hermes-phone-hfp/blob/development/docs/phone-routing.md)
- [Calls, reminders, and follow-up workflows](https://github.com/virusz4274/hermes-phone-hfp/blob/development/docs/hermes-call-workflows.md)
- [Compatibility and hardware limits](https://github.com/virusz4274/hermes-phone-hfp/blob/development/docs/compatibility.md)

<!-- Based on development commit 8b8d072645f5cc8930d6a14f6793b682273e56dd: README.md, docs/install.md, docs/phone-routing.md, docs/hermes-call-workflows.md, docs/compatibility.md, SECURITY.md, and TODO.md. -->
