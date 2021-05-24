# Check to see if the lore session is already running.
tmux has-session -t lore
if [ $? != 0 ]; then
  # Verify that the project_dir variable is set to an actual directory.
  if [ ! -d $project_dir ]; then
    printf "%b" "The project_dir variable is not set to a valid directory." >&2
    exit 1
  fi

  # Move into the project directory.
  cd $project_dir

  # Create a new session called lore and make the first window the console
  tmux new-session -s lore -n console -d

  # Create a new window to be the dev server.
  tmux new-window -n server -t lore
  tmux send-keys -t lore "npm run dev" C-m

  # Attach to the session
  tmux select-window -t lore:1
fi

# Start VS Code for editing.
code .

# The lore session is running, so just attach
tmux attach -t lore
