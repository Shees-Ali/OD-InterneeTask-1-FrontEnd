import os
import re
from rich.console import Console
from time import sleep

console = Console()

# Ask the user for the component name and route
component_name = input("Enter the component name: ")
route = input("Enter the route for the component: ")

console.print("[blue]Creating the Modules and Component")
#Generate the module
os.system(f"ng g m {route}/{component_name}")

# Generate the component
os.system(f"ng g c {route}/{component_name}")

# Generate the routing module
os.system(
        f"ng g m {route}/{component_name}/{component_name}-routing --flat --routing --module={component_name}")

with console.status("Renaming Files"):
    sleep(1)
    # Set the directory path where the files are located
    dir_path = "src/app/" + route + "/" + component_name + "/"

    for filename in os.listdir(dir_path):
        # Check if the file name starts with "test.component"
        if filename.startswith(component_name + ".component"):
            # Get the file extension
            file_ext = os.path.splitext(filename)[1]
            # Generate the new file name
            new_filename = filename.replace("component", "page")
            # Rename the file
            os.rename(os.path.join(dir_path, filename),
                    os.path.join(dir_path, new_filename))
    console.print("Renaming Files :white_check_mark:")

with console.status("Modifying Routing for Page"):
    sleep(1)
    # Define the paths to the original and new files
    original_file = "src/app/" + route + "/" + \
        component_name + "/" + component_name+"-routing-routing.module.ts"
    new_file = "src/app/" + route + "/" + \
        component_name + "/" + component_name+"-routing.module.ts"

    # Open the original file and read its contents
    with open(original_file, "r") as f:
        file_content = f.read()

    # Replace the string "[componentName]RoutingRoutingModule" with "[componentName]RoutingModule"
    file_content = file_content.replace(
        component_name.title() + "RoutingRoutingModule", component_name.title() + "RoutingModule")

    file_content = file_content.replace(
        "const routes: Routes = [];", "const routes: Routes = [{ path: '', component:" + component_name.title() + "Page}];")

    index = file_content.index("from '@angular/router';") + 24

    file_content = file_content[:index] + "\n" + "import { " + component_name.title(
    ) + "Page } from './" + component_name + ".page';" + file_content[index:]


    # Create the new file and write the contents to it
    with open(new_file, "w") as f:
        f.write(file_content)

    # Delete the original file
    os.remove(original_file)
    console.print("Modifying Routing for Page :white_check_mark:")

# Code for replacing inside the .ts file
with console.status("Renaming Inside Component .ts file"):
    sleep(1)
    # Define the path to the file to be modified
    file_path = "src/app/" + route + "/" + \
        component_name + "/" + component_name+".page.ts"

    # Open the file and read its contents
    with open(file_path, "r") as f:
        file_content = f.read()

    # Define the regular expression pattern for the filenames
    pattern1 = rf"{component_name}\.component\.(\w+)"
    pattern2 = rf"{component_name.title()}Component"

    # Define the replacement strings for the filenames
    replacement1 = rf"{component_name}.page.\g<1>"
    replacement2 = rf"{component_name.title()}Page"

    # Use regular expressions to replace the filenames
    modified_content = re.sub(pattern1, replacement1, file_content)
    modified_content = re.sub(pattern2, replacement2, modified_content)

    # Save the modified content to the file
    with open(file_path, "w") as f:
        f.write(modified_content)

    console.print("Renaming Inside Component .ts file :white_check_mark:")

with console.status("Modifying the Module file"):
    sleep(1)
    # Open the module file
    module_file_path = "src/app/" + route + "/" + \
        component_name + "/" + component_name+".module.ts"

    # Open the file and read its contents
    with open(module_file_path, "r") as f:
        module_content = f.read()

    module_pattern = rf"{component_name.title()}Component"
    module_pattern2 = rf"{component_name}.component"
    module_replacement = rf"{component_name.title()}Page"
    module_replacement2 = rf"{component_name}.page"
    modified_module = re.sub(module_pattern, module_replacement, module_content)
    modified_module = re.sub(module_pattern2, module_replacement2, modified_module)
    # Save the modified content to the file
    with open(module_file_path, "w") as f:
        f.write(modified_module)

    console.print("Modifying the Module file :white_check_mark:")

console.print("Completed :white_check_mark:")