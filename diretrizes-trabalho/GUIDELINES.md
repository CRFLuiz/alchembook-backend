# Work Guidelines

## Organization
1. **Rule Creation**:  
   - **Existing Grouping**:  
     - Before adding a new rule, **check if it fits into an existing grouping** (e.g., Development, Documentation, Git).  
   - **New Grouping Creation**:  
     - If no suitable grouping exists, **create a new one** with a **single-word title** (e.g., "Structure", "Process").  
   - **Objective**:  
     - Keep guidelines organized and easy to navigate.  
     - Ensure rules are logically and consistently categorized.

2. **Sequential Numbering**:  
   - **Rule Addition**:  
     - **Always** insert new rules **after existing ones** in the same grouping, using the next sequential number.  
   - **Prohibition of Prior Insertion**:  
     - **Never** add a rule **before an existing one**.  
   - **Objective**:  
     - Maintain chronological order and logical structure of guidelines.  
     - Facilitate navigation and reference to rules.

3. **Coding Standards**:  
   - **Comments and Naming**:  
     - **Always** declare comments, functions, and variables **in English**, regardless of the project language.  
   - **Objective**:  
     - Standardize naming and documentation.  
     - Facilitate collaboration in multilingual teams.

## Development
1. **Default Language**: Work must be done in **JavaScript/Node.js** unless another language is explicitly specified.

2. **Project Context**: When starting work, verify if it's a new or existing project by listing/reading files in directories and subdirectories. In existing projects, read all relevant files and their dependencies for full understanding.

3. **Full Understanding**: Do not invent functionalities or structures. When receiving a request, **read all necessary files** until full context understanding is achieved.  
   - **Example**: To add a `/users` endpoint:  
     1. Read `index.js` to identify the `routes` folder.  
     2. List files in `routes` and locate where user endpoints are defined.  
     3. Check the `controllers` folder and read the file responsible for users (e.g., `userController.js`).  
     4. Analyze imports from `models` to understand database interaction.  
     5. Create the new model (if necessary), implement logic in the controller, and define the route.  
     **Do not assume the structure** without full verification.

4. **Standardization and Naming**:  
   - **Existing Projects**:  
     - **Review Key Files**: Identify and follow existing standardization and naming conventions.  
   - **New Projects**:  
     - **Analyze Guidelines**: Check for standardization and naming rules.  
     - **Define Standards**: If no rules exist, **create a standardization** and follow it consistently.  
   - **Objective**:  
     - Maintain code consistency.  
     - Facilitate maintenance and collaboration.

5. **Patch Tool Usage**:  
   - **Pre-Patch Analysis**:  
     - Before applying a patch, **read the entire file content** to understand the context and identify the specific section to modify.  
   - **Unique Code Block**:  
     - Create a **minimalist patch** that changes only the necessary part, avoiding large or repetitive blocks.  
   - **Objective**:  
     - Reduce token consumption and processing time.  
     - Ensure precise and efficient patches.

## Documentation
1. **Process Documentation**:  
   - **Task Request**:  
     - The user may request tasks directly here or via a `.md` file (e.g., `requests.md` or `_gptme_requests.md`). If the filename is not specified, consider these names by default.  
   - **Prior Analysis**:  
     - **Always** analyze code, files, and structure **before** starting any development.  
   - **Step Documentation**:  
     - Create `_gptme_steps.md` to describe **all necessary steps** to solve the task.  
   - **Step Validation**:  
     - Request user validation for the documented steps.  
   - **Task Planning**:  
     - After validation, create `_gptme_pm.md` to divide tasks into subtasks with the following markers:  
       - `[ ]` Not completed  
       - `[x]` Completed  
       - `[/]` Paused (started but interrupted)  
       - `[-]` Failed (unable to complete)  
   - **Execution Report**:  
     - Create `_gptme_description.md` to register:  
       - What was done.  
       - Which files were modified.  
     - **Update** this file **for each new task**, appending new reports.  
   - **Reset Auxiliary Files**:  
     - **Always** when starting new work, check if `_gptme_steps.md`, `_gptme_pm.md`, and `_gptme_description.md` exist.  
     - **Delete all old content** from these files to avoid residual information.  
   - **Work Start**:  
     - Only after user validation and file reset, start task execution.

2. **Project Knowledge**:  
   - **Project Identification**:  
     - The project name is derived from the current directory name (e.g., `alchembook-backend`).  
   - **Knowledge Documentation**:  
     - Check the `gptme-knowledge` folder for a `.md` file with the project name (e.g., `alchembook-backend.md`).  
     - **If it exists**: Read the file **before** any analysis or development.  
     - **If it doesn't exist**:  
       1. Create it **as soon as** sufficient project knowledge is acquired.  
       2. **Update it** whenever new understanding is achieved.  
   - **Objective**: Maintain the `gptme-knowledge/[PROJECT_NAME].md` file as the single source of truth for project architecture, flows, and technical decisions.

## Verification
1. **Post-Task Verification**:  
   - **Final Review**:  
     - After concluding a task, **review all edited files** to ensure:  
       - Implementation correctness.  
       - Alignment with guidelines and requirements.  
   - **Status Marking**:  
     - **Only after verification**, update `_gptme_pm.md` with the appropriate status:  
       - `[x]` Completed (works as expected).  
       - `[/]` Paused (partially implemented or pending dependencies).  
       - `[-]` Failed (unresolved issues or unmet requirements).  
   - **Verification Record**:  
     - Include verification details in `_gptme_description.md`, highlighting:  
       - Tests performed.  
       - Validated items.  
       - Critical points or pending issues (if any).

## Git
1. **Git Interactions**:  
   - **Explicit Request**:  
     - Git interactions (commit, push, PR) must be performed **only if explicitly requested by the user**, except for Rule 3 (Versioning and Backup).  
   - **Exception**:  
     - Rule 3 (Versioning and Backup) is exempt and must always be followed.  
   - **Objective**:  
     - Avoid unnecessary Git operations without user consent.  
     - Ensure compliance with user instructions.

2. **Commit Message**:  
   - **Pre-Commit Review**:  
     - Before committing, **review all modified files** to ensure:  
       - Necessary and intentional changes.  
       - Absence of debug logs or unnecessary commented code.  
   - **Commit Format**:  
     - Create a clear and concise message in the format:  
       - `[SCOPE] DESCRIPTION` (e.g., `[FEAT] Add user endpoint`).  
     - **Example**:  
       ```bash
       git commit -m "[FEAT] Implement user registration endpoint"
       ```  
   - **Objective**:  
     - Facilitate understanding of changes through commit history.  
     - Ensure traceability and code maintainability.

3. **Pull Request (PR)**:  
   - **Code Diff Review**:  
     - Before creating the PR, **analyze the code diff** between branches to ensure:  
       - Changes aligned with the task.  
       - No unwanted or unrelated changes.  
   - **Title and Description**:  
     - **Title**: Short and descriptive (e.g., `[FEAT] Add registration endpoint`).  
     - **Description**:  
       - **Changes**: What was added, removed, or modified.  
       - **Motivation**: Why the changes were necessary.  
       - **Functionality**: What the changes do (e.g., "Allows user registration").  
       - **Tests**: Steps for the user to test the implementation (e.g., "Access `/users/register` and fill the form").  
   - **Example Description**:  
     ```markdown
     **Changes**:  
     - Added `/users/register` endpoint in `userController.js`.  
     - Created `User.js` model for database interaction.  
     - Updated `routes.js` to map the new route.  

     **Motivation**:  
     Implementation required to allow user registration in the system.  

     **Functionality**:  
     The `/users/register` endpoint receives POST data, validates it, and creates a new user in the database.  

     **Tests**:  
     1. Send a `POST` request to `/users/register` with:  
        ```json
        { "name": "John Doe", "email": "john@example.com", "password": "123456" }
        ```  
     2. Verify the user is created in the database and the response returns status 201.  
     ```  
   - **Objective**:  
     - Ensure clear, self-explanatory, and testable PRs.  
     - Facilitate code review and merging.

4. **Versioning and Backup**:  
   - **Git Provider Verification**:  
     - **If the project is on a Git provider (e.g., GitHub, GitLab, Bitbucket)**:  
       1. **Check uncommitted changes**:  
          - If there are unadded (add), uncommitted, or unpushed files, **notify the user** and **await resolution** before proceeding.  
          - **Example Notification**:  
            > "There are uncommitted changes. Please provide instructions on how to proceed."  
       2. Create a branch named `feature/_<WORK_NAME>` (e.g., `feature/_add-user-endpoint`).  
       3. Develop changes in this branch.  
     - **If the project is NOT on a Git provider**:  
       1. Copy the project folder to a secure location, **excluding unnecessary folders** (e.g., `node_modules`).  
       2. Create a `gptme_bkps.md` file in the project root with the backup path (e.g., `/backups/alchembook-backend_20250607`).  
   - **Objective**:  
     - Ensure code organization and traceability.  
     - Avoid loss of changes or environment contamination.  
   - **Pending Changes Procedure**:  
     - **Insist on Resolution**:  
       - If the user does not provide a solution, **repeat the notification** until the issue is resolved.  
       - **Example Insistence**:  
         > "I cannot proceed without resolving pending changes. Please instruct how to proceed."

## References
1. **Rule Reference**:  
   - **Reference Format**:  
     - When mentioning a rule, use the format:  
       - **Title.Topic_Number** (e.g., **Development.3**, **Documentation.15**, **Verification.1**, **Git.2**).  
     - This means new titles added to the rules should contain only one word whenever possible.  
   - **Objective**:  
     - Facilitate clear and consistent references to rules.  
     - Avoid ambiguities in communication.

## Communication
1. **Response Language**:  
   - **User Alignment**:  
     - **Always** respond in the language used by the user in the current interaction.  
   - **Objective**:  
     - Ensure clear communication and respect for the user's preference.
