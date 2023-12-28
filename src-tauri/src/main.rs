// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::State;

use tauri_examples::process::execute_command_json::{ExecuteCommandArgs, ExecuteCommandResult};
use tauri_examples::process::maybe_error::MaybeError;
use tauri_examples::state::{EditorSettings, EditorSettingsWrapper};

fn main() {
    tauri::Builder::default()
        .manage(EditorSettingsWrapper(Default::default()))
        .invoke_handler(tauri::generate_handler![
            execute_command,
            execute_command_json,
            maybe_error,
            retrieve_editor_settings,
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
fn retrieve_editor_settings(settings: State<'_, EditorSettingsWrapper>) -> EditorSettings {
    settings.0.lock().unwrap().clone()
}
