#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EditorSettings {
    pub font_family: String,
    pub tab_size: u8,
    pub expand_tab: bool,
    pub word_wrap: bool,
}

const DEFAULT_FONT_FAMILY: &str =
    "'Source Han Code JP', Cica, 'SF Mono', Menlo, Monaco, 'Courier New', monospace";

impl Default for EditorSettings {
    fn default() -> Self {
        Self {
            font_family: DEFAULT_FONT_FAMILY.to_owned(),
            tab_size: 4,
            expand_tab: true,
            word_wrap: false,
        }
    }
}
