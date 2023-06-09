
folder="portal"  # Specify the folder path here
ship="~zod"

if [ $# -eq 0 ]; then
    echo "Please provide the replace string as an argument."
    exit 1
fi

replace_string="$1"  # Get the replace string from the first argument

find "$folder" -type f -exec sed -i "s/$ship/$replace_string/g" {} +