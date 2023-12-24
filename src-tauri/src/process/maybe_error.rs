use serde::ser::SerializeMap;

#[derive(Debug, thiserror::Error)]
pub enum MaybeError {
    /// IOエラー
    #[error(transparent)]
    Io(#[from] std::io::Error),

    /// 予期しないエラー
    #[error("予期しないエラーが発生しました。")]
    Unexpected,
}

/// フロントエンドを返すために、MaybeErrorをJSONに変換するためのシリアライザを実装する必要がある。
impl serde::Serialize for MaybeError {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        match self {
            MaybeError::Io(e) => {
                let mut map = serializer.serialize_map(Some(2))?;
                map.serialize_entry("type", "io")?;
                map.serialize_entry("message", &e.to_string())?;
                map.end()
            }
            MaybeError::Unexpected => {
                let mut map = serializer.serialize_map(Some(2))?;
                map.serialize_entry("type", "unexpected")?;
                map.serialize_entry("message", &self.to_string())?;
                map.end()
            }
        }
    }
}
