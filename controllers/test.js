// Test API

exports.test = (req, res) => {
    res.status(200).json({ msg: 'This is a Test API.' })
} 