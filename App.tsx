import { AppLayout, Button, Input, ResultLabel, UsersList } from '@/components';

export default function App() {
  return (
    <AppLayout>
      <Input placeholder="Enter username" />

      <Button label="Search" onPress={() => {}} />

      <ResultLabel>
        {'Showing users for "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"'}
      </ResultLabel>

      <UsersList
        users={[
          {
            login: 'aaa1',
          },
          {
            login: 'aaa2',
          },
          {
            login: 'aaa3',
          },
        ]}
        userRepositories={[
          {
            name: 'RepoName',
            description: 'description',
            stargazers_count: 10,
          },
          {
            name: 'RepoName',
            description: null,
            stargazers_count: 10,
          },
          {
            name: 'RepoName',
            description: 'description',
            stargazers_count: 10,
          },
        ]}
      />
    </AppLayout>
  );
}
