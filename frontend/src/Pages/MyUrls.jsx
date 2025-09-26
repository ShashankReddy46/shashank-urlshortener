import React, { useState } from "react";
import Service from "../utils/http";
import { Anchor, Table, Text, Button, Group, Modal, TextInput, Space } from "@mantine/core";
import { IconEdit, IconTrash } from '@tabler/icons-react';

const MyUrls = () => {
  const service = new Service();
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newOriginalUrl, setNewOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async (pageNumber = 1) => {
    try {
      const response = await service.get(`user/my/url?page=${pageNumber}&limit=${pageSize}`);
      setData(response.data || []);
      setTotalPages(response.pagination ? response.pagination.totalPages : 1);
      setPage(response.pagination ? response.pagination.currentPage : 1);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    getData(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewTitle(item.title || '');
    setNewOriginalUrl(item.originalUrl);
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    setLoading(true);
    try {
      await service.patch(`shorturl/${editingItem.shortCode}`, {
        title: newTitle,
        originalUrl: newOriginalUrl
      });
      setEditModalOpen(false);
      getData(page);
    } catch (error) {
      console.error("Error updating URL:", error);
      // You might want to show some user feedback here.
    }
    setLoading(false);
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`Are you sure you want to delete the URL with short code "${item.shortCode}"?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await service.delete(`shorturl/${item.shortCode}`);
      // If the current page has no more data after deletion, move back a page
      if (data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        getData(page);
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      // Show user feedback here if needed
    }
    setLoading(false);
  };

  return (
    <div>
      <Table
        withColumnBorders
        withRowBorders
        highlightOnHover
        highlightOnHoverColor="#ea750eff"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Short URL</Table.Th>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data && data.map((item) => (
            <Table.Tr key={item.shortCode}>
              <Table.Td>
                <Text>{item.title || "NA"}</Text>
              </Table.Td>
              <Table.Td>
                <Anchor
                  href={item.shortCode ? `${service.getBaseURL()}/api/s/${item.shortCode}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.shortCode}
                </Anchor>
              </Table.Td>
              <Table.Td>
                <Text>{item.originalUrl}</Text>
              </Table.Td>
              <Table.Td>
                <Text>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "NA"}</Text>
              </Table.Td>
              <Table.Td>
                <Group spacing="xs">
                  <Button size="xs" onClick={() => handleEdit(item)}><IconEdit size={18} /></Button>
                  <Button size="xs" color="red" onClick={() => handleDelete(item)}><IconTrash size={18} /></Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Group position="center" mt="md">
        <Button onClick={handlePrev} disabled={page <= 1 || loading}>Previous</Button>
        <Text align="center" style={{ lineHeight: '36px' }}>
          Page {page} of {totalPages}
        </Text>
        <Button onClick={handleNext} disabled={page >= totalPages || loading}>Next</Button>
      </Group>

      {/* Edit Modal */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit URL"
        centered
        closeOnClickOutside={!loading}
        closeOnEscape={!loading}
      >
        <TextInput
          label="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.currentTarget.value)}
          disabled={loading}
          mb="sm"
        />
        <TextInput
          label="Original URL"
          value={newOriginalUrl}
          onChange={(e) => setNewOriginalUrl(e.currentTarget.value)}
          disabled={loading}
          mb="sm"
        />
        <Group position="right" mt="md">
          <Button variant="default" onClick={() => setEditModalOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={loading} disabled={loading || !newOriginalUrl.trim()}>
            Save
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default MyUrls;
