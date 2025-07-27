const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('User connection:', socket.id);

    socket.on('chat-message', async (data) => {
      socket.broadcast.emit('chat message', {
        message: data.message,
        time: data.time,
        sender: data.sender, 
        profile: data.profile || '👤',
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
    });
  });
};
