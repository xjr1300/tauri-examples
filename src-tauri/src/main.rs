// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![execute_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/*-------------------- Execute Command --------------------*/

#[tauri::command]
fn execute_command(name: String, age: u8) -> String {
    format!("私は{}、{}歳です。", name, age)
}
