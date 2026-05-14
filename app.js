const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// --- 1. KONEKSI DATABASE ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Kosongkan jika pakai XAMPP standar
    database: 'barang_branded'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi ke database:', err.message);
        return;
    }
    console.log('Terhubung ke MariaDB (XAMPP)!');
});

// --- 2. CRUD DATA MASTER (Products) ---

// [GET] Ambil semua produk
app.get('/api/products', (req, res) => {
    const sql = 'SELECT p.*, b.brand_name FROM products p JOIN brands b ON p.brand_id = b.brand_id';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// [POST] Tambah produk baru
app.post('/api/products', (req, res) => {
    const { brand_id, name, model_year, price, stock } = req.body;
    const sql = 'INSERT INTO products (brand_id, name, model_year, price, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [brand_id, name, model_year, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Produk berhasil dibuat', id: result.insertId });
    });
});

// [PUT] Update produk
app.put('/api/products/:id', (req, res) => {
    const { name, price, stock } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, stock = ? WHERE product_id = ?';
    db.query(sql, [name, price, stock, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Produk berhasil diperbarui' });
    });
});

// [DELETE] Hapus produk
app.delete('/api/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE product_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Produk berhasil dihapus' });
    });
});

// --- 3. CRUD DATA TRANSAKSIONAL (Orders) ---

// [POST] Buat Pesanan Baru
app.post('/api/orders', (req, res) => {
    const { user_id, total_amount } = req.body;
    const sql = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
    db.query(sql, [user_id, total_amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', message: 'Transaksi Berhasil', order_id: result.insertId });
    });
});

// [GET] Ambil Riwayat Pesanan (DITAMBAHKAN AGAR TIDAK 404)
app.get('/api/orders', (req, res) => {
    const sql = `
        SELECT o.order_id, o.order_date, o.total_amount, u.username 
        FROM orders o 
        JOIN users u ON o.user_id = u.user_id
        ORDER BY o.order_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', data: results });
    });
});

// --- 4. STATISTIC DATA TRANSAKSIONAL ---

app.get('/api/statistics', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM users) as total_users,
            (SELECT SUM(total_amount) FROM orders) as total_revenue,
            (SELECT COUNT(*) FROM products WHERE stock < 5) as low_stock_items
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: 'success', statistics: results[0] });
    });
});

// JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server API Luxury Store berjalan di http://localhost:${PORT}`);
});