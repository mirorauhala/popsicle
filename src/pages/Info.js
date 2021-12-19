const Title = ({ children }) => {
  return (
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-indigo-900 mb-3">{children}</h2>
    </div>
  );
};

const TitleSmaller = ({ children }) => {
  return (
    <div className="md:w-1/2">
      <h2 className="text-lg font-bold text-indigo-900 mb-2">{children}</h2>
    </div>
  );
};

const Block = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row mt-10 mb-12">{children}</div>
  );
};

const Content = ({ children }) => {
  return <div className="md:w-1/2">{children}</div>;
};

const Link = ({ children, ...rest }) => {
  return (
    <a
      className="text-black underline decoration-indigo-600 decoration-2 font-medium"
      {...rest}
    >
      {children}
    </a>
  );
};

export default function Info() {
  return (
    <div className="md:w-9/12 max-w-4xl mx-auto px-4 pt-10 md:pt-16">
      <div className="pb-4 border-b-2 border-indigo-200">
        <h1 className="text-5xl font-bold text-indigo-900 mb-2">Info</h1>
      </div>

      <Block>
        <Title>The app</Title>
        <Content>
          <p className="text-lg">
            Popsicle is a kanban application made by Miro Rauhala with React for
            as part of the frontend course at Tampere University of Applied
            Sciences.
          </p>
        </Content>
      </Block>

      <Block>
        <Title>Usage Instructions</Title>
      </Block>

      <Block>
        <TitleSmaller>General</TitleSmaller>
        <Content>
          <p className="text-lg">
            The application is easy to use. That's why I believe the app is
            intuitive enough to use without reading a manual. In any case I've
            compiled some usage instructions below to help users in need.
          </p>
        </Content>
      </Block>

      <Block>
        <TitleSmaller>Lists</TitleSmaller>
        <Content>
          <p className="text-lg mb-3">
            Lists can be added by pressing the "New list" button. Lists can be
            reordered by dragging from the list's name.
          </p>

          <p className="text-lg mb-3">
            From the three-dotted menu button beside the list's name you can
            rename and delete the list. Note that deleting a list will delete
            all the tasks that belong to it.
          </p>
        </Content>
      </Block>

      <Block>
        <TitleSmaller>Tasks</TitleSmaller>
        <Content>
          <p className="text-lg mb-3">
            Tasks can be created by typing the task to the input element found
            on the list and pressing enter, or alternatively pressing the plus
            icon next to the input box. The task will be saved immediately to
            the list.
          </p>

          <p className="text-lg mb-3">
            Tasks can be deleted by selecting "Delete" from the three-dotted
            menu button found on the task card itself. On desktop you'll see the
            menu when hovering the card with your cursor. On mobile the
            three-dotted menu button is visible at all times.
          </p>

          <p className="text-lg mb-3">
            Tasks can be updated by clicking on the task contents. Pressing
            enter or clicking elsewhere will save the updated task to the
            system.
          </p>
        </Content>
      </Block>

      <Block>
        <TitleSmaller>Tags</TitleSmaller>
        <Content className="w-1/2">
          <p className="text-lg mb-3">
            Tags can be created by clicking the "Add tags..." text found on the
            tasks, typing a new tag and then pressing enter. The tag will be
            saved to the system and applied to the chosen task.
          </p>

          <p className="text-lg mb-3">
            Existing tags can be added to tasks by clicking the "Add tags..."
            text found on the tasks and selecting a tag from the dropdown list.
            The chosen tag will be applied to the task.
          </p>

          <p className="text-lg mb-3">
            Tags can be detached from tasks by clicking the little X button seen
            on the tag itself. Detaching a tag will remove it from the task but
            won't remove it from the system.
          </p>
        </Content>
      </Block>

      <Block>
        <TitleSmaller>Filter & search</TitleSmaller>
        <Content>
          <p className="text-lg mb-3">
            To filter tasks, simply select a tag to filter with from the "Filter
            by" dropdown found at the top of the page. Note that having an
            active filter will disable reordering tasks. New tasks can still be
            created and they will have the chosen filter applied to them.
          </p>

          <p className="text-lg mb-3">
            To search tasks, simply enter the search query to the search box
            found at top of the page. The search results will show immediately.
          </p>

          <p className="text-lg mb-3">
            To sort tasks, simply select a sorting strategy from the "Sort by"
            dropdown found at the top of the page. Note that having an active
            sorting strategy applied will disable reordering tasks.
          </p>
        </Content>
      </Block>

      <Block>
        <TitleSmaller>Alerts</TitleSmaller>
        <Content>
          <p className="text-lg mb-3">
            To be notified of a task, simply select "Set alert" from the
            three-dotted menu button found on the task itself. A popup will be
            shown asking the specific date and time when the alert will be
            shown.
          </p>

          <p className="text-lg mb-3">
            Note that to receive alerts, your browser must've granted
            notification permissions for the Popsicle application. When setting
            an alert, the application will ask you to grant permission.
          </p>

          <p className="text-lg mb-3">
            Alerts cannot be set to tasks that are marked as done. Also note
            that alerts will be disabled for tasks that have and alert, but get
            marked as done before the alert is shown.
          </p>
        </Content>
      </Block>

      <Block>
        <Title>Open-Source Licenses</Title>
      </Block>
      <Block>
        <TitleSmaller>Technologies</TitleSmaller>
        <Content>
          <p className="text-lg mb-3">
            The application has been built with several open-source
            technologies. Below is a list of the technologies used in this
            project.
          </p>

          <table className="border w-full mb-4">
            <thead>
              <tr>
                <th className="border w-1/2">Library</th>
                <th className="border w-1/2">License</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/autoprefixer">
                    autoprefixer
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/axios">axios</Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/postcss">
                    postcss
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/react">react</Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/react-beautiful-dnd">
                    react-beautiful-dnd
                  </Link>
                </td>
                <td className="border w-1/2 px-2">Apache-2.0</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/react-modal">
                    react-modal
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/react-router">
                    react-router
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/react-select">
                    react-select
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/sanitize-html">
                    sanitize-html
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
              <tr>
                <td className="border w-1/2 px-2">
                  <Link href="https://www.npmjs.com/package/tailwindcss">
                    tailwindcss
                  </Link>
                </td>
                <td className="border w-1/2 px-2">MIT</td>
              </tr>
            </tbody>
          </table>

          <p className="text-lg mb-3">
            The fonts{" "}
            <Link href="https://fonts.google.com/specimen/Quicksand">
              Quicksand
            </Link>{" "}
            and{" "}
            <Link href="https://fonts.google.com/specimen/Sniglet">
              Sniglet
            </Link>{" "}
            used throughout the app are licensed under the SIL Open Font
            License.
          </p>

          <p className="text-lg mb-3">
            The plus icon used in the new task field is made my Miro.
          </p>
        </Content>
      </Block>
    </div>
  );
}
