export const LONGFORM_CURRENT_PLUGIN_DATA_VERSION = 3;
export const LONGFORM_CURRENT_INDEX_VERSION = 1;

// projects 2.0

export type IndentedScene = {
  title: string;
  indent: number;
};

export type MultipleSceneDraft = {
  format: "scenes";
  title: string;
  titleInFrontmatter: boolean;
  draftTitle: string | null;
  vaultPath: string;
  workflow: string | null;
  sceneFolder: string;
  scenes: IndentedScene[];
  ignoredFiles: string[] | null;
  unknownFiles: string[];
};

export type SingleSceneDraft = {
  format: "single";
  title: string;
  titleInFrontmatter: boolean;
  draftTitle: string | null;
  vaultPath: string;
  workflow: string | null;
};

export type Draft = MultipleSceneDraft | SingleSceneDraft;

// projects 1.0

export interface DraftsMetadata {
  name: string;
  folder: string;
  scenes: string[];
}

export interface IndexFileMetadata {
  version: number;
  workflow: string | null;
  drafts: DraftsMetadata[];
}

export interface LongformProjectSettings {
  path: string;
  indexFile: string;
  draftsPath: string;
}

export type SerializedStep = {
  id: string;
  optionValues: { [id: string]: unknown };
};

export type SerializedWorkflow = {
  name: string;
  description: string;
  steps: SerializedStep[];
};

/**
 * Draft vault paths to either a map of scene names to word counts or,
 * in the case of single-scene drafts, the word count.
 */
export type DraftWordCounts = Record<string, Record<string, number> | number>;

export type WordCountSession = {
  /**
   * Start date for this session.
   */
  start: Date;

  /**
   * Total number of words written in this session.
   */
  total: number;

  /**
   * Stats in this session per draft.
   */
  drafts: Record<
    string,
    {
      /**
       * Total words written in this draft in this session.
       */
      total: number;

      /**
       * Stats in this session per scene.
       */
      scenes: Record<string, number>;
    }
  >;
};

export interface LongformPluginSettings {
  version: number;
  selectedDraftVaultPath: string | null;
  workflows: Record<string, SerializedWorkflow> | null;
  userScriptFolder: string | null;
  sessions: WordCountSession[];
  showWordCountInStatusBar: boolean;
  startNewSessionEachDay: boolean;
  sessionGoal: number;
  applyGoalTo: "all" | "project" | "note";
  notifyOnGoal: boolean;
  countDeletionsForGoal: boolean;
  keepSessionCount: number;
  // DEPRECATED. To be removed in future, needed now for migrations.
  projects: { [path: string]: LongformProjectSettings };
}

export enum ProjectLoadError {
  None,
  MissingMetadata = "This project’s metadata is either missing or invalid. Please check its index file. If all else fails, you can reset all project tracking in settings and re-mark folders as Longform projects.",
}

export type ProjectDetails = LongformProjectSettings &
  IndexFileMetadata & {
    error: ProjectLoadError;
  };

export const DEFAULT_SETTINGS: LongformPluginSettings = {
  version: LONGFORM_CURRENT_PLUGIN_DATA_VERSION,
  selectedDraftVaultPath: null,
  workflows: null,
  userScriptFolder: null,
  sessions: [],
  showWordCountInStatusBar: true,
  startNewSessionEachDay: true,
  sessionGoal: 500,
  applyGoalTo: "all",
  notifyOnGoal: true,
  countDeletionsForGoal: false,
  keepSessionCount: 30,
  projects: {},
};

export const TRACKED_SETTINGS_PATHS = [
  "version",
  "projects",
  "selectedDraftVaultPath",
  "userScriptFolder",
  "sessions",
  "showWordCountInStatusBar",
  "startNewSessionEachDay",
  "sessionGoal",
  "applyGoalTo",
  "notifyOnGoal",
  "countDeletionsForGoal",
  "keepSessionCount",
];
