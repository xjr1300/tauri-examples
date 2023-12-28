use std::sync::Mutex;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct EditorSettings {
    pub font_family: String,
    pub tab_size: u8,
    pub expand_tab: bool,
    pub word_wrap: bool,
}

impl Default for EditorSettings {
    fn default() -> Self {
        Self {
            font_family: "monospace".to_string(),
            tab_size: 4,
            expand_tab: false,
            word_wrap: false,
        }
    }
}

#[derive(Debug)]
pub struct EditorSettingsWrapper(pub Mutex<EditorSettings>);
