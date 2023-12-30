use std::borrow::Cow;

use sqlx::{Row as _, SqlitePool};

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

#[derive(Debug, Clone, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Vegetable {
    pub id: u32,
    pub name: String,
    pub price: u32,
}

#[derive(Debug, Clone, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AdditionalVegetable {
    pub name: String,
    pub price: u32,
}

#[derive(Debug, thiserror::Error)]
pub enum DBError {
    #[error("{0}")]
    Unexpected(Cow<'static, str>),
}

impl serde::Serialize for DBError {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        let message = match self {
            DBError::Unexpected(message) => message,
        };
        serializer.serialize_str(message)
    }
}

pub async fn retrieve_vegetables(pool: &SqlitePool) -> Result<Vec<Vegetable>, DBError> {
    let rows = sqlx::query("SELECT id, name, price FROM green_grocer")
        .fetch_all(pool)
        .await
        .map_err(|e| DBError::Unexpected(e.to_string().into()))?;
    let vegetables = rows
        .iter()
        .map(|row| Vegetable {
            id: row.get::<u32, _>("id"),
            name: row.get::<String, _>("name"),
            price: row.get::<u32, _>("price"),
        })
        .collect::<Vec<_>>();

    Ok(vegetables)
}

pub async fn add_vegetable(
    pool: &SqlitePool,
    additional_vegetable: AdditionalVegetable,
) -> Result<(), DBError> {
    sqlx::query("INSERT INTO green_grocer (name, price) VALUES (?, ?)")
        .bind(additional_vegetable.name)
        .bind(additional_vegetable.price)
        .execute(pool)
        .await
        .map_err(|e| DBError::Unexpected(e.to_string().into()))?;

    Ok(())
}
