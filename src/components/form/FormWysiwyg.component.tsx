import IconFormatBlockquote from "@assets/icons/icon-format-blockquote.svg"
import IconFormatBold from "@assets/icons/icon-format-bold.svg"
import IconFormatClear from "@assets/icons/icon-format-clear.svg"
import IconFormatH1 from "@assets/icons/icon-format-h1.svg"
import IconFormatH2 from "@assets/icons/icon-format-h2.svg"
import IconFormatH3 from "@assets/icons/icon-format-h3.svg"
import IconFormatHr from "@assets/icons/icon-format-hr.svg"
import IconFormatItalic from "@assets/icons/icon-format-italic.svg"
import IconFormatLinkOff from "@assets/icons/icon-format-link-off.svg"
import IconFormatLink from "@assets/icons/icon-format-link.svg"
import IconFormatListBulleted from "@assets/icons/icon-format-list-bulleted.svg"
import IconFormatListNumbered from "@assets/icons/icon-format-list-numbered.svg"
import IconFormatParagraph from "@assets/icons/icon-format-paragraph.svg"
import IconFormatRedo from "@assets/icons/icon-format-redo.svg"
import IconFormatStrikethrough from "@assets/icons/icon-format-strikethrough.svg"
import IconFormatUndo from "@assets/icons/icon-format-undo.svg"
import IconImage from "@assets/icons/icon-image.svg"
import IconTableCellMerge from "@assets/icons/icon-table-cell-merge.svg"
import IconTableCellSplit from "@assets/icons/icon-table-cell-split.svg"
import IconTableColumnPlusAfter from "@assets/icons/icon-table-column-plus-after.svg"
import IconTableColumnPlusBefore from "@assets/icons/icon-table-column-plus-before.svg"
import IconTableColumnRemove from "@assets/icons/icon-table-column-remove.svg"
import IconTableHeaderRow from "@assets/icons/icon-table-header-row.svg"
import IconTableRemove from "@assets/icons/icon-table-remove.svg"
import IconTableRowPlusAfter from "@assets/icons/icon-table-row-plus-after.svg"
import IconTableRowPlusBefore from "@assets/icons/icon-table-row-plus-before.svg"
import IconTableRowRemove from "@assets/icons/icon-table-row-remove.svg"
import IconTable from "@assets/icons/icon-table.svg"
import { DashboardContext } from "@contexts/DashboardContext.context"
import Color from "@tiptap/extension-color"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import ListItem from "@tiptap/extension-list-item"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TextStyle from "@tiptap/extension-text-style"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useContext, useEffect } from "react"
import {
	FieldError,
	FieldErrorsImpl,
	FieldValues,
	Merge,
	UseFormReturn
} from "react-hook-form"

interface Props {
	setForm: UseFormReturn<FieldValues, object>
	name: string
	label?: string
	error?: Merge<FieldError, FieldErrorsImpl> | string
}

export default function FormWysiwyg({
	setForm,
	error,
	name,
	label = ``
}: Props) {
	const { watch, setValue, getValues } = setForm
	// remove <p> from inside of <li>
	const CustomListItem = ListItem.extend({
		name: `CleanListItem`,
		content: `text*`
	})

	const editor = useEditor({
		extensions: [
			StarterKit,
			CustomListItem,
			TextStyle,
			Color,
			Image,
			Table,
			TableCell,
			TableHeader,
			TableRow,
			Link.configure({
				openOnClick: false
			})
		],
		content: ``
	})
	const html = editor?.getHTML()

	useEffect(() => {
		if (!editor || editor.isDestroyed) return

		if (!watch) {
			editor.commands.setContent(``)
		}
	}, [editor, watch])

	useEffect(() => {
		if (!editor || editor.isDestroyed) return

		editor.commands.setContent(getValues(name))
	}, [editor, getValues, name])

	useEffect(() => {
		if (!editor || editor.isDestroyed) return

		setValue(name, html)
	}, [editor, setValue, name, html])

	return (
		<div className="form-wysiwyg">
			<label className="form-wysiwyg-heading">{label}</label>
			<div
				className={`form-wysiwyg-field ${
					getValues(name) === `<p></p>` && error ? `is-error` : ``
				}`}
			>
				<div className="form-wysiwyg-menu">
					<MenuBar editor={editor} />
				</div>
				<div className="form-wysiwyg-editor">
					<EditorContent editor={editor} />
				</div>
			</div>
			{error && getValues(name) === `<p></p>` && (
				<p className="form-input-error">{error}</p>
			)}
		</div>
	)
}

function MenuBar({ editor }) {
	const { dispatch } = useContext(DashboardContext)

	if (!editor) {
		return null
	}

	async function uploadImage(file: File) {
		let imageUrl: string

		dispatch({ type: `set_isLoading`, payload: true })

		try {
			console.log(file)
		} catch (error) {
			console.log(error)
		}

		dispatch({ type: `set_isLoading`, payload: false })
		return imageUrl
	}

	function addImage(url: string) {
		if (url) {
			editor.chain().focus().setImage({ src: url }).run()
		}
	}

	function setLink() {
		const previousUrl = editor.getAttributes(`link`).href
		const url = window.prompt(`URL`, previousUrl)

		if (url === null) {
			return
		}

		if (url === ``) {
			editor.chain().focus().extendMarkRange(`link`).unsetLink().run()
			return
		}

		editor.chain().focus().extendMarkRange(`link`).setLink({ href: url }).run()
	}

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e?.target?.files?.[0]) return
		uploadImage(e.target.files[0])
			.then((res) => addImage(res))
			.catch((err) => console.error(err))
	}

	return (
		<>
			<div className="section">
				<button
					type="button"
					title="Bold"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive(`bold`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatBold className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Italic"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive(`italic`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatItalic className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Strike"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive(`strike`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatStrikethrough className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Clear Formatting"
					onClick={() => editor.chain().focus().unsetAllMarks().run()}
				>
					<i className="icon" role="img">
						<IconFormatClear className="svg" />
					</i>
				</button>

				<input
					type="color"
					onInput={(event) =>
						editor
							.chain()
							.focus()
							.setColor((event.target as HTMLInputElement).value)
							.run()
					}
					value={editor.getAttributes(`textStyle`).color || `#000000`}
				/>

				<div className="divider"></div>

				<button
					type="button"
					title="Paragraph"
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive(`paragraph`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatParagraph className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Heading 1"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive(`heading`, { level: 1 }) ? `is-active` : ``
					}
				>
					<i className="icon" role="img">
						<IconFormatH1 className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Heading 2"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive(`heading`, { level: 2 }) ? `is-active` : ``
					}
				>
					<i className="icon" role="img">
						<IconFormatH2 className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Heading 3"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive(`heading`, { level: 3 }) ? `is-active` : ``
					}
				>
					<i className="icon" role="img">
						<IconFormatH3 className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Bullet List"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive(`bulletList`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatListBulleted className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Ordered List"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive(`orderedList`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatListNumbered className="svg" />
					</i>
				</button>

				<div className="divider"></div>

				<button
					type="button"
					title="Add Link"
					onClick={setLink}
					className={editor.isActive(`link`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatLink className="svg" />
					</i>
				</button>

				<button
					onClick={() => editor.chain().focus().unsetLink().run()}
					disabled={!editor.isActive(`link`)}
				>
					<i className="icon" title="Remove Link" role="img">
						<IconFormatLinkOff className="svg" />
					</i>
				</button>

				<label htmlFor="image-upload">
					<span className="button" title="Image">
						<i className="icon" role="img">
							<IconImage className="svg" />
						</i>
					</span>
					<input
						type="file"
						onChange={handleImageChange}
						id="image-upload"
						className="is-hidden"
					/>
				</label>

				<button
					type="button"
					title="Blockquote"
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					className={editor.isActive(`blockquote`) ? `is-active` : ``}
				>
					<i className="icon" role="img">
						<IconFormatBlockquote className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Horizontal Rule"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
				>
					<i className="icon" role="img">
						<IconFormatHr className="svg" />
					</i>
				</button>

				<div className="divider"></div>

				<button
					type="button"
					title="Undo"
					onClick={() => editor.chain().focus().undo().run()}
				>
					<i className="icon" role="img">
						<IconFormatUndo className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Redo"
					onClick={() => editor.chain().focus().redo().run()}
				>
					<i className="icon" role="img">
						<IconFormatRedo className="svg" />
					</i>
				</button>
			</div>
			<div className="section">
				<button
					type="button"
					title="Insert Table"
					onClick={() =>
						editor
							.chain()
							.focus()
							.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
							.run()
					}
				>
					<i className="icon" role="img">
						<IconTable className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Remove Table"
					onClick={() => editor.chain().focus().deleteTable().run()}
					disabled={!editor.can().deleteTable()}
				>
					<i className="icon" role="img">
						<IconTableRemove className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Toggle Header"
					onClick={() => editor.chain().focus().toggleHeaderRow().run()}
					disabled={!editor.can().toggleHeaderRow()}
				>
					<i className="icon" role="img">
						<IconTableHeaderRow className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Add Column Before"
					onClick={() => editor.chain().focus().addColumnBefore().run()}
					disabled={!editor.can().addColumnBefore()}
				>
					<i className="icon" role="img">
						<IconTableColumnPlusBefore className="svg" />
					</i>
				</button>
				<button
					type="button"
					title="Add Column After"
					onClick={() => editor.chain().focus().addColumnAfter().run()}
					disabled={!editor.can().addColumnAfter()}
				>
					<i className="icon" role="img">
						<IconTableColumnPlusAfter className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Remove Column"
					onClick={() => editor.chain().focus().deleteColumn().run()}
					disabled={!editor.can().deleteColumn()}
				>
					<i className="icon" role="img">
						<IconTableColumnRemove className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Add Row Before"
					onClick={() => editor.chain().focus().addRowBefore().run()}
					disabled={!editor.can().addRowBefore()}
				>
					<i className="icon" role="img">
						<IconTableRowPlusBefore className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Add Row After"
					onClick={() => editor.chain().focus().addRowAfter().run()}
					disabled={!editor.can().addRowAfter()}
				>
					<i className="icon" role="img">
						<IconTableRowPlusAfter className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Remove Row"
					onClick={() => editor.chain().focus().deleteRow().run()}
					disabled={!editor.can().deleteRow()}
				>
					<i className="icon" role="img">
						<IconTableRowRemove className="svg" />
					</i>
				</button>

				<button
					type="button"
					title="Merge Cells"
					onClick={() => editor.chain().focus().mergeCells().run()}
					disabled={!editor.can().mergeCells()}
				>
					<i className="icon" role="img">
						<IconTableCellMerge className="svg" />
					</i>
				</button>
				<button
					type="button"
					title="Split Cell"
					onClick={() => editor.chain().focus().splitCell().run()}
					disabled={!editor.can().splitCell()}
				>
					<i className="icon" role="img">
						<IconTableCellSplit className="svg" />
					</i>
				</button>
			</div>
		</>
	)
}
