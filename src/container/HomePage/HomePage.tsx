import { Fragment, useState } from 'react';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import type { ProjectListProperties } from "../../components/Sidebar/Sidebar";
import styled from "styled-components"

const HomePage: React.FC = (): JSX.Element => {
    const [currentContent, setCurrentContent] = useState<string>('Inbox');
    const [projectList, setProjectList] = useState<Array<ProjectListProperties>>([]);
    const [unsavedList, setUnsavedList] = useState<Array<ProjectListProperties>>([]);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const addUnsavedList = (item: ProjectListProperties): void => {
        setUnsavedList((prevState) => {
            return [...unsavedList, item]
        })
    }

    return (
        <Fragment>
            <AppContainer>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <Body>
                    <Sidebar 
                      setCurrentContent={setCurrentContent} 
                      projectList={projectList}
                      setProjectList={setProjectList}
                      unsavedList={unsavedList}
                      setUnsavedList={setUnsavedList}
                      addUnsavedList={addUnsavedList}
                    />
                    <Content 
                      darkMode={darkMode} 
                      projectList={projectList}
                      unsavedList={unsavedList}
                      currentContent={currentContent}
                    />
                </Body>
            </AppContainer>
        </Fragment>
    )
}

export default HomePage;

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #e2e2e2;
`;

export const Body = styled.div`
    flex: 1;
    display: flex;
    margin-right: 500px;
    margin-left: 400px;
`;
