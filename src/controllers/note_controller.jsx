import Note from '../models/note';

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      // eslint-disable-next-line no-param-reassign
      result[item.id] = item;
      return result;
    }, {});
  });
};

export async function deleteNote(id) {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      throw new Error(`Post with id ${id} not found`);
    }
    return { note };
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
}

export async function createNote(fields) {
  const note = new Note();
  note.title = fields.title;
  note.x = fields.x;
  note.y = fields.y;
  note.zIndex = fields.zIndex;
  note.text = fields.text;

  try {
    const savedNote = await note.save();
    return savedNote;
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
}

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
