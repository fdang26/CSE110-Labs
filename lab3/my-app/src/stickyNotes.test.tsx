import { render, screen, fireEvent } from "@testing-library/react";
import StickyNotes from "./stickyNotes";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create/Update Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create/Update Note");

    fireEvent.change(createNoteTitleInput, {
      target: { value: "New Note" },
    });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("all notes exist on initial render", () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((element) =>
      expect(screen.getByText(element.title)).toBeInTheDocument
    );
  });

  test("update note details", () => {
    render(<StickyNotes />);

    // Generate the form fields
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create/Update Note");
    // Retrieve note number 1 from dummy list in init. render
    const note1Title = dummyNotesList[0].title;
    const note1Content = dummyNotesList[0].content;

    // Clicking the title should trigger updating rather than creating new note
    fireEvent.click(screen.getByText(dummyNotesList[0].title)); 
    fireEvent.change(createNoteTitleInput, {
      target: { value: "new title 1" },
    });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "random text content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("new title 1");
    const newNoteContent = screen.getByText("random text content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
    expect(screen.getByTestId("title-1")).not.toEqual(note1Title);
    expect(screen.getByTestId("content-1")).not.toEqual(note1Title);
  });

  test("deletion of the note", () => {
    render(<StickyNotes />);
    const noteTitle = dummyNotesList[0].title;
    const noteToDelete = screen.getByText(noteTitle);
    const createNoteDeleteButton = screen.getByTestId("deleteButton-1");
    fireEvent.click(createNoteDeleteButton);
    
    expect(noteToDelete).not.toBeInTheDocument;
  });
});
