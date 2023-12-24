/// execute-command-jsonコマンドの引数
///
/// コマンドが受け付けるデータを定義する構造体は、フロントエンドから渡されたJSONデータから構造体のインスタンスを
/// 構築する必要があるため、`serde::Deserialize`を導出する必要がある。
#[derive(Debug, Clone, serde::Deserialize)]
pub struct ExecuteCommandArgs {
    pub name: String,
    pub age: u8,
}

/// execute-command-jsonコマンドの結果
///
/// コマンドが返すデータを定義する構造体は、フロントエンドにJSONデータで渡す必要があるため、`serde::Serialize`
/// を導出する必要がある。
#[derive(Debug, Clone, serde::Serialize)]
pub struct ExecuteCommandResult {
    pub message: String,
}
