/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Ocp-Apim-Subscription-Key - API key that used for collect data from LaLiga public services */
  "apikey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `standing` command */
  export type Standing = ExtensionPreferences & {}
  /** Preferences accessible in the `result` command */
  export type Result = ExtensionPreferences & {}
  /** Preferences accessible in the `other` command */
  export type Other = ExtensionPreferences & {}
  /** Preferences accessible in the `club` command */
  export type Club = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `standing` command */
  export type Standing = {}
  /** Arguments passed to the `result` command */
  export type Result = {}
  /** Arguments passed to the `other` command */
  export type Other = {}
  /** Arguments passed to the `club` command */
  export type Club = {}
}


