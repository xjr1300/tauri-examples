// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

use sqlx::SqlitePool;
use tauri::{Manager as _, State};

use tauri_examples::process::execute_command_json::{ExecuteCommandArgs, ExecuteCommandResult};
use tauri_examples::process::maybe_error::MaybeError;
use tauri_examples::state::EditorSettings;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().expect("Failed to load .env file");

    let editor_settings = EditorSettings::default();
    let editor_settings = Mutex::new(editor_settings);

    let database_url =
        std::env::var("DATABASE_URL").expect("DATABASE_URL must be set in environment");
    let pool = SqlitePool::connect(&database_url).await.unwrap();
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to migrate database");
    let pool = Arc::new(Mutex::new(pool.clone()));

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .manage(editor_settings)
        .manage(pool)
        .invoke_handler(tauri::generate_handler![
            execute_command,
            execute_command_json,
            maybe_error,
            retrieve_editor_settings,
            save_editor_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/*-------------------- Execute Command --------------------*/

#[tauri::command]
fn execute_command(name: String, age: u8) -> String {
    format!("私は{}、{}歳です。", name, age)
}

/*----------------- Execute Command JSON ---------------*/
#[tauri::command]
fn execute_command_json(args: ExecuteCommandArgs) -> ExecuteCommandResult {
    ExecuteCommandResult {
        message: format!(
            "「私は{}、{}歳です。」というメッセージをJSON形式で返しました。",
            args.name, args.age
        ),
    }
}

/*-------------------- Maybe Error --------------------*/
#[tauri::command]
fn maybe_error(expected: String) -> Result<String, MaybeError> {
    match expected.as_str() {
        "unexpected" => Err(MaybeError::Unexpected),
        "io" => Err(MaybeError::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "IOエラーが発生しました。",
        ))),
        _ => Ok("正常終了".to_string()),
    }
}

/*-------------------- Retrieve Editor Settings --------------------*/
#[tauri::command]
fn retrieve_editor_settings(settings: State<'_, Mutex<EditorSettings>>) -> EditorSettings {
    settings.lock().unwrap().clone()
}

#[tauri::command]
fn save_editor_settings(settings: State<'_, Mutex<EditorSettings>>, new_settings: EditorSettings) {
    *settings.lock().unwrap() = new_settings;
}
